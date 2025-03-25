import { ApiResponseProperty } from '@nestjs/swagger';

export class UrlShortenerResponseDto {
  @ApiResponseProperty({
    type: 'number',
  })
  id: number;

  @ApiResponseProperty({
    type: 'string',
  })
  link: string;

  @ApiResponseProperty({
    type: 'string',
  })
  createdAt: Date;
  @ApiResponseProperty({
    type: 'string',
  })
  updatedAt: Date;

  constructor(id: number, url: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.link = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
