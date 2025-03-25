import { UrlShortener } from 'src/core/entities/url-shortener.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class UrlShortenerResponseDto {
  @ApiResponseProperty({
    type: 'number',
  })
  id: number;

  @ApiResponseProperty({
    type: 'string',
  })
  url: string;

  @ApiResponseProperty({
    type: 'string',
  })
  original_url: string;

  @ApiResponseProperty({
    type: 'string',
  })
  createdAt: Date;
  @ApiResponseProperty({
    type: 'string',
  })
  updatedAt: Date;

  constructor(
    id: number,
    url: string,
    original_url: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.url = url;
    this.original_url = original_url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
