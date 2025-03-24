import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user.response.dto';
import { Public } from './utils/public';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserResponseDto } from 'src/users/dto/create-user.response.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/create')
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new CreateUserResponseDto(
      user.id,
      user.email,
      user.createdAt,
      user.updatedAt,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  async signIn(@Body() signInDto: LoginUserDto) {
    const accessToken: string = await this.authService.signIn(signInDto);
    return new LoginUserResponseDto(signInDto.email, accessToken);
  }
}
