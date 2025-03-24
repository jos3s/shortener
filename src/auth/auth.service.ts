import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginUserDto): Promise<string> {
    const user = await this.usersService.findOne(email);
    if (user != null) {
      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) throw new UnauthorizedException();

      const payload = { sub: user.id, email: user.email };
      return await this.jwtService.signAsync(payload);
    }
    throw new BadRequestException();
  }
}
