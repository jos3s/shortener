import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiResponseProperty({
    type: 'string',
  })
  email: string;

  @ApiResponseProperty({
    type: 'string',
  })
  access_token: string;

  constructor(email: string, access_token: string) {
    this.email = email;
    this.access_token = access_token;
  }
}
