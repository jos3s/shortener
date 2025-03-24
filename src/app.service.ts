import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { Repository } from 'typeorm';
import { UrlShortener } from './url-shortener/entities/url-shortener.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('URLSHORTENER_REPOSITORY')
    private urlShortenerRepository: Repository<UrlShortener>,
  ) {}

  async redirect(link: string) {
    const urlShortener = await this.urlShortenerRepository.findOneBy({
      shortenerLink: link,
    });

    if (urlShortener != null) {
      urlShortener.accessCounter++;

      await this.urlShortenerRepository.save(urlShortener);

      return urlShortener.url;
    } else {
      throw new BadRequestException();
    }
  }
}
