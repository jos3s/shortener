import { dataSource } from './datasource';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      return dataSource.initialize();
    },
  },
];
