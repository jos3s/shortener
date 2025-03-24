import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
