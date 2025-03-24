import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { DatabaseModule } from 'src/database/database.module';
import { urlShortenerProviders } from './url-shortener.providers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [UrlShortenerController],
  providers: [...urlShortenerProviders, UrlShortenerService],
})
export class UrlShortenerModule {}
