/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersAdminController } from './users.admin.controller';
import { UsersUserController } from './users.user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    UsersAdminController,
    UsersUserController,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

