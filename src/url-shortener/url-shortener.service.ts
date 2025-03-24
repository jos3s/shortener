import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShorteningService } from 'src/url-sortening/url-sortening.service';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
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

  // update(id: number, updateUrlShortenerDto: UpdateUrlShortenerDto) {
  //   return `This action updates a #${id} urlShortener`;
  // }

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
