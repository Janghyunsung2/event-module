import { Module, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './jwt/jwt-middleware';
import { AccessGuard } from './common/access/access.guard';
import { RolesGuard } from './role/role.guard';
import { JwtWsGuard } from './jwt/jwt-ws.guard';
import { ExternalAuthModule } from './external-auth.module';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt/jwt-strategy";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        JwtModule.register({ secret: process.env.JWT_SECRET || 'default', signOptions: { expiresIn: '1h' } }),
        ExternalAuthModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default',
            signOptions: { expiresIn: '1h' },
        }),

    ],
    providers: [AccessGuard, RolesGuard, JwtWsGuard, JwtStrategy],
    exports: [AccessGuard, RolesGuard, JwtWsGuard],
})
export class GatewayModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes('*');
    }
}