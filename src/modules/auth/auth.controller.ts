import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './utils/public';
import { CreateUserDto } from 'src/core/dtos/user/create-user.dto';
import { CreateUserResponseDto } from 'src/core/dtos/user/create-user.response.dto';
import { UsersService } from 'src/modules/users/users.service';
import { LoginUserDto } from 'src/core/dtos/user/login-user.dto';
import { LoginUserResponseDto } from 'src/core/dtos/user/login-user.response.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/create')
  @Public()
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
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
  @ApiBody({
    type: LoginUserDto,
    required: true,
  })
  @ApiResponse({
    type: LoginUserResponseDto,
  })
  async signIn(@Body() signInDto: LoginUserDto) {
    const accessToken: string = await this.authService.signIn(signInDto);
    return new LoginUserResponseDto(signInDto.email, accessToken);
  }
}
