import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
