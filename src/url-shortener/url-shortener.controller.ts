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
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortenerResponseDto } from './dto/url-shortener.response.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import { Public } from 'src/auth/utils/public';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  @Public()
  async create(
    @Req() req: Request,
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
  ) {
    const shortenerUrl = await this.urlShortenerService.create(
      createUrlShortenerDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req['user']?.sub,
    );

    const response = new UrlShortenerResponseDto(
      shortenerUrl.id,
      `${req.protocol}://${req.get('Host')}/${shortenerUrl.shortenerLink}`,
      shortenerUrl.createdAt,
      shortenerUrl.updatedAt,
    );
    return response;
  }

  @Get('all')
  @ApiBearerAuth()
  async findAll(@Req() req: Request) {
    const defaultUrl = `${req.protocol}://${req.get('Host')}`;

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
  @ApiBearerAuth()
  update(
    @Param('id') id: number,
    @Body() updateUrlShortenerDto: UpdateUrlShortenerDto,
  ) {
    return this.urlShortenerService.update(id, updateUrlShortenerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(
    @Res() req: Request,
    @Res() response: Response,
    @Param('id') id: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.urlShortenerService.remove(id, req['user']?.sub);
    return response.status(204);
  }

  @Get('/:path')
  @Public()
  @Redirect()
  async redirect(@Req() request: Request, @Param('path') path: string) {
    return { url: await this.urlShortenerService.redirect(path) };
  }
}
