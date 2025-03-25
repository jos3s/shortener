import { DataSourceOptions } from 'typeorm';

type ConstantsType = {
  database: DataSourceOptions;
  jwt: { secret: string };
};

export const Constants: ConstantsType = {
  database: {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },

  jwt: {
    secret:
      'DONOTUSETHISVALUE.INSTEAD,CREATEACOMPLEXSECRETANDKEEPITSAFEOUTSIDEOFTHESOURCECODE.',
  },
};
