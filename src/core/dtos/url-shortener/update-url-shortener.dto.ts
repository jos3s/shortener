import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUrlShortenerDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.youtube.com/',
    required: true,
  })
  url: string;
}
