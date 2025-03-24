import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShorteningService } from 'src/url-sortening/url-sortening.service';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
// import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';

@Injectable()
export class UrlShortenerService {
  constructor(
    @Inject('URLSHORTENER_REPOSITORY')
    private urlShortenerRepository: Repository<UrlShortener>,
  ) {}

  async create(createUrlShortenerDto: CreateUrlShortenerDto) {
    const shortenerUrl = await new UrlShorteningService(
      this.urlShortenerRepository,
    ).generateUniqueCode();

    const url: UrlShortener = new UrlShortener(
      createUrlShortenerDto.url,
      shortenerUrl,
    );

    await this.urlShortenerRepository.save(url);

    return url;
  }

  findAll() {
    return `This action returns all urlShortener`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} urlShortener`;
  // }

  // update(id: number, updateUrlShortenerDto: UpdateUrlShortenerDto) {
  //   return `This action updates a #${id} urlShortener`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} urlShortener`;
  // }
}
