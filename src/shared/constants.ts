import { DataSourceOptions } from 'typeorm';

type ConstantsType = {
  database: DataSourceOptions;
  jwt: { secret: string };
};

export const Constants: ConstantsType = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'shortener',
    password: 'shortener.db',
    database: 'shortener',
  },

  jwt: {
    secret:
      'DONOTUSETHISVALUE.INSTEAD,CREATEACOMPLEXSECRETANDKEEPITSAFEOUTSIDEOFTHESOURCECODE.',
  },
};
