import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUrlShortenerDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.youtube.com/',
    required: true,
  })
  url: string;
}
