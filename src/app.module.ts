import { Module } from '@nestjs/common';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { AuthModule } from './auth/auth.module';
import { ShorteningService } from './url-shortener/utils/shortening.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UrlShortenerService } from './url-shortener/url-shortener.service';
import { urlShortenerProviders } from './url-shortener/url-shortener.providers';

@Module({
  providers: [UrlShortenerService, ShorteningService, ...urlShortenerProviders],
  imports: [UrlShortenerModule, AuthModule, UsersModule, DatabaseModule],
})
export class AppModule {}
