import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.modules';
import { CheckRatesModule } from './check-rates/check-rates.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { ValidationErrorFilter } from './filter/validation.filter';
import { SumsArrayModule } from './sums-array/sums-array.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal:true,
      cache:true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
          ...databaseConfig,
          entities: [],
          keepConnectionAlive: true,
          autoLoadEntities: true,
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UsersModule,
    CheckRatesModule,
    CacheModule.register({
      ttl:5, //seconds
      max:10, //maximum number of items in cache
      isGlobal:true,
    }),
    SumsArrayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
  ],
})
export class AppModule {}
