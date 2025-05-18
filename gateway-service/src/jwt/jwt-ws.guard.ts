import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExternalAuthService } from '../service/auth.service.service';
import { Socket } from 'socket.io';

@Injectable()
export class JwtWsGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: ExternalAuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client: Socket = context.switchToWs().getClient();
        const token = client.handshake.headers.authorization?.split(' ')[1];
        console.log('token', token);
        if (!token) throw new UnauthorizedException('토큰이 없습니다.');

        try {
            const payload = this.jwtService.verify(token);
            const user = await this.authService.validateUserByPayload(payload);
            (client as any).user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException('토큰 인증 실패');
        }
    }
}