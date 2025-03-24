import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponseDto } from './dto/login-user.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signInDto: LoginUserDto) {
    const accessToken: string = await this.authService.signIn(signInDto);
    return new LoginUserResponseDto(signInDto.email, accessToken);
  }
}
