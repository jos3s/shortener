import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'shortener',
  password: 'shortener.db',
  database: 'shortener',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [],
  synchronize: true,
});
