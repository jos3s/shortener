import { AuthGuard } from './auth.guard';

export const authProvider = [
  {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  },
];
