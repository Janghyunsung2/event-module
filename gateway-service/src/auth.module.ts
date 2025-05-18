import { Module } from '@nestjs/common';
import { ExternalAuthService } from './service/auth.service.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
    ],
    providers: [ExternalAuthService, JwtStrategy],
    exports: [ExternalAuthService],
})
export class AuthModule {}