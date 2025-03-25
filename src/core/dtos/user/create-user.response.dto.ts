import { ApiResponseProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiResponseProperty({
    type: 'number',
  })
  id: number;

  @ApiResponseProperty({
    type: 'string',
  })
  email: string;

  @ApiResponseProperty({
    type: 'string',
  })
  createdAt: Date;

  @ApiResponseProperty({
    type: 'string',
  })
  updatedAt: Date;

  constructor(id: number, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
