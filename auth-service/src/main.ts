import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {GatewayAuthMiddleware} from "./middleware/gateway-auth.middleware";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());

  const config = new DocumentBuilder()
      .setTitle('API 문서')
      .setDescription('auth-service API 문서')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(new GatewayAuthMiddleware().use);

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
