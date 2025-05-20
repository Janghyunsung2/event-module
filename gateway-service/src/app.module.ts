import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import { ProxyAuthController } from './proxy/auth/proxy-auth.controller';
import { ProxyEventController } from './proxy/event/proxy-event.controller';
import { ProxyRewardLogController } from './proxy/event/proxy-reward-log.controller';
import { ProxyUserEventProgressController } from './proxy/event/proxy-user-event-progress.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserIdHeaderMiddleware } from './common/user-id-header.middleware';
import {ProxyRewardController} from "./proxy/event/proxy-reward.controller";
import {ProxyRewardRequestController} from "./proxy/event/proxy-reward-request.controller";

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    GatewayModule,
  ],
  controllers: [
    ProxyAuthController,
    ProxyEventController,
    ProxyRewardLogController,
    ProxyUserEventProgressController,
      ProxyRewardController,
      ProxyRewardRequestController
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdHeaderMiddleware).forRoutes('*');
  }
}