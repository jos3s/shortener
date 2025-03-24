import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { DatabaseModule } from 'src/database/database.module';
import { urlShortenerProviders } from './url-shortener.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlShortenerController],
  providers: [...urlShortenerProviders, UrlShortenerService],
})
export class UrlShortenerModule {}
