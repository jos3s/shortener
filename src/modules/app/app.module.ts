import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UrlShortenerModule } from '../url-shortener/url-shortener.module';
import { urlShortenerProviders } from '../url-shortener/url-shortener.providers';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
import { ShorteningService } from '../url-shortener/utils/shortening.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [UrlShortenerService, ShorteningService, ...urlShortenerProviders],
  imports: [UrlShortenerModule, AuthModule, UsersModule, DatabaseModule],
})
export class AppModule {}
