import { Constants } from 'src/shared/constants';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  ...Constants.database,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [],
  synchronize: true,
});
