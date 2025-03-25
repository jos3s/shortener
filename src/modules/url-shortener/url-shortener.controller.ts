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
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/utils/public';
import { CreateUrlShortenerDto } from 'src/core/dtos/url-shortener/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from 'src/core/dtos/url-shortener/update-url-shortener.dto';
import { UrlShortenerResponseDto } from 'src/core/dtos/url-shortener/url-shortener.response.dto';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  @Public()
  @ApiBody({
    type: CreateUrlShortenerDto,
    description: 'Json structure for user object',
  })
  @ApiResponse({
    type: UrlShortenerResponseDto,
    status: 201,
  })
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
  @ApiResponse({
    status: 200,
    description: 'All url shortener by user',
    type: UrlShortenerResponseDto,
    isArray: true,
  })
  async findAll(@Req() req: Request) {
    const defaultUrl = `${req.protocol}://${req.get('Host')}`;

    const urls = await this.urlShortenerService.findAllByUserId(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req['user']?.sub,
    );

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
  @ApiResponse({
    status: 204,
    type: UrlShortenerResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateUrlShortenerDto: UpdateUrlShortenerDto,
  ) {
    const url = await this.urlShortenerService.update(
      id,
      updateUrlShortenerDto,
    );
    return new UrlShortenerResponseDto(
      url.id,
      url.shortenerLink,
      url.createdAt,
      url.updatedAt,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
  })
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
