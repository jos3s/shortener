import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/core/entities/user.entity';
import { CreateUrlShortenerDto } from 'src/core/dtos/url-shortener/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from 'src/core/dtos/url-shortener/update-url-shortener.dto';
import { UrlShortener } from 'src/core/entities/url-shortener.entity';
import { ShorteningService } from './utils/shortening.service';
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

    let user: User | null = null;
    if (userId != null) user = await this.usersService.findOneById(userId);

    const url: UrlShortener = new UrlShortener(
      createUrlShortenerDto.url,
      shortenerUrl,
      user ?? undefined,
    );

    await this.urlShortenerRepository.save(url);

    return url;
  }

  async findAllByUserId(userId: number) {
    return await this.urlShortenerRepository.findBy({
      user: { id: userId },
    });
  }

  async findOne(id: number) {
    return await this.urlShortenerRepository.findOneBy({
      id: id,
    });
  }

  async update(id: number, updateUrlShortenerDto: UpdateUrlShortenerDto) {
    const urlShortener = await this.urlShortenerRepository.findOneBy({
      id: id,
    });

    if (urlShortener != null) {
      urlShortener.url = updateUrlShortenerDto.url;

      await this.urlShortenerRepository.save(urlShortener);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number, userId: number) {
    const urlShortener = await this.urlShortenerRepository.findOneBy({
      id: id,
      user: { id: userId },
    });

    if (urlShortener != null) {
      urlShortener.deletedAt = new Date();
      await this.urlShortenerRepository.save(urlShortener);
    } else {
      throw new NotFoundException();
    }
  }

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
