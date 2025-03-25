import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { urlShortenerProviders } from './url-shortener.providers';
import { UsersModule } from 'src/modules/users/users.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { ShorteningService } from './utils/shortening.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [UrlShortenerController],
  providers: [...urlShortenerProviders, ShorteningService, UrlShortenerService],
})
export class UrlShortenerModule {}
