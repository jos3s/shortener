import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { CreateUrlShortenerResponseDto } from './dto/create-url-shortener.respose.dto';

@Controller('shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
  ) {
    const shortenerUrl = await this.urlShortenerService.create(
      createUrlShortenerDto,
      1,
    );

    const response = new CreateUrlShortenerResponseDto(
      `${req.protocol}://${req.get('Host')}/${shortenerUrl.shortenerLink}`,
    );
    return response;
  }

  @Get()
  async findAll() {
    return this.urlShortenerService.findAllByUserId(1);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.urlShortenerService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUrlShortenerDto: UpdateUrlShortenerDto,
  ) {
    return this.urlShortenerService.update(id, updateUrlShortenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.urlShortenerService.remove(id);
  }
}
