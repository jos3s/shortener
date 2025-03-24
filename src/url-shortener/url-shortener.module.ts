import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { DatabaseModule } from 'src/database/database.module';
import { urlShortenerProviders } from './url-shortener.providers';
import { UsersModule } from 'src/users/users.module';
import { ShorteningService } from 'src/url-shortener/utils/shortening.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [UrlShortenerController],
  providers: [...urlShortenerProviders, ShorteningService, UrlShortenerService],
})
export class UrlShortenerModule {}
