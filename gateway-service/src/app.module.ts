import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
import {ProxyAuthController} from "./proxy/proxy-auth.controller";
import {ProxyEventController} from "./proxy/proxy-event.controller";

@Module({
  imports: [GatewayModule],
    controllers: [ProxyAuthController, ProxyEventController],
})
export class AppModule {}