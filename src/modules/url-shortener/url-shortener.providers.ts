import { UrlShortener } from 'src/core/entities/url-shortener.entity';
import { DataSource } from 'typeorm';

export const urlShortenerProviders = [
  {
    provide: 'URLSHORTENER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlShortener),
    inject: ['DATA_SOURCE'],
  },
];
