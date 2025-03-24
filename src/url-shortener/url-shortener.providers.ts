import { DataSource } from 'typeorm';
import { UrlShortener } from './entities/url-shortener.entity';

export const urlShortenerProviders = [
  {
    provide: 'URLSHORTENER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlShortener),
    inject: ['DATA_SOURCE'],
  },
];
