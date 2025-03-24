import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { AuthModule } from './auth/auth.module';
import { UrlShorteningService } from './url-sortening/url-sortening.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UrlShortenerService } from './url-shortener/url-shortener.service';
import { urlShortenerProviders } from './url-shortener/url-shortener.providers';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    UrlShortenerService,
    UrlShorteningService,
    ...urlShortenerProviders,
  ],
  imports: [UrlShortenerModule, AuthModule, UsersModule, DatabaseModule],
})
export class AppModule {}
