import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortenerResponseDto } from './dto/url-shortener.response.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';

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

    const response = new UrlShortenerResponseDto(
      shortenerUrl.id,
      `${req.protocol}://${req.get('Host')}/r/${shortenerUrl.shortenerLink}`,
      shortenerUrl.createdAt,
      shortenerUrl.updatedAt,
    );
    return response;
  }

  @Get()
  async findAll(@Req() req: Request) {
    const defaultUrl = `${req.protocol}://${req.get('Host')}/r/`;

    const urls = await this.urlShortenerService.findAllByUserId(1);

    return urls?.map(
      (url) =>
        new UrlShortenerResponseDto(
          url.id,
          `${defaultUrl}/${url.shortenerLink}`,
          url.createdAt,
          url.updatedAt,
        ),
    );
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
  async remove(@Res() response: Response, @Param('id') id: number) {
    await this.urlShortenerService.remove(id);
    return response.status(204);
  }
}
