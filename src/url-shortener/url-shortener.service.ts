import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { ShorteningService } from 'src/url-shortener/utils/shortening.service';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
// import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';

@Injectable()
export class UrlShortenerService {
  constructor(
    @Inject('URLSHORTENER_REPOSITORY')
    private urlShortenerRepository: Repository<UrlShortener>,
    private usersService: UsersService,
    private urlShorteningService: ShorteningService,
  ) {}

  async create(createUrlShortenerDto: CreateUrlShortenerDto, userId: number) {
    const shortenerUrl = await this.urlShorteningService.generateUniqueCode();

    const user = await this.usersService.findOneById(userId);

    const url: UrlShortener = new UrlShortener(
      createUrlShortenerDto.url,
      shortenerUrl,
      user!,
    );

    await this.urlShortenerRepository.save(url);

    return url;
  }

  async findAllByUserId(userId: number) {
    return await this.urlShortenerRepository.findBy({
      user: { id: userId },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} urlShortener`;
  // }

  async update(id: number, updateUrlShortenerDto: UpdateUrlShortenerDto) {
    const urlShortener = await this.urlShortenerRepository.findOneBy({
      id: id,
    });

    if (urlShortener != null) {
      urlShortener.url = updateUrlShortenerDto.url;

      urlShortener.shortenerLink =
        await this.urlShorteningService.generateUniqueCode();

      await this.urlShortenerRepository.save(urlShortener);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    const urlShortener = await this.urlShortenerRepository.findOneBy({
      id: id,
    });

    if (urlShortener != null) {
      urlShortener.deletedAt = new Date();
      await this.urlShortenerRepository.save(urlShortener);
    } else {
      throw new NotFoundException();
    }
  }
}
