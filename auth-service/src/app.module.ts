import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthServiceController } from './controller/auth-service.controller';
import { AuthService } from './service/auth-service.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constans';
import {RedisModule, RedisModuleOptions} from '@nestjs-modules/ioredis';
import { User, UserSchema } from './schemas/user.schema';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import * as process from "node:process";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // 전역 설정
  }),
    MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://localhost:27017/authdb'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
    RedisModule.forRootAsync({
      useFactory: (): RedisModuleOptions => ({
        type: 'single',
        options: {
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      }),
    }),
  ],
  controllers: [AuthServiceController, AppController],
  providers: [AuthService, AppService],
})
export class AppModule {}
