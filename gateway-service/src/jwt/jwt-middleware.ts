import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {JwtService} from '@nestjs/jwt';
import {ExternalAuthService} from '../service/auth.service.service';
import axios from "axios";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: ExternalAuthService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {

        if(req.baseUrl == '/auth/logout' || req.baseUrl == '/auth/refresh') {
            return next();
        }
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return next();

        try {
            const payload = this.jwtService.verify(token);
            (req as any).user = await this.authService.validateUserByPayload(payload);

            return next();
        } catch (e) {

            if(e.name != 'TokenExpiredError') {
                return next();
            }
            const refreshToken = req.headers['x-refresh-token'] || req.body?.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: '리프레시 토큰 없음' });
            }
            try{
                const { data } = await axios.post(
                `${process.env.AUTH_SERVICE_URL}/refresh`,
                {
                    accessToken: req.headers.authorization?.replace('Bearer ', ''),
                    refreshToken,
                });
                req.headers.authorization = `Bearer ${data.accessToken}`;

                const payload = this.jwtService.verify(data.accessToken);
                const user = await this.authService.validateUserByPayload(payload);
                (req as any).user = user;

                return next();
            }catch {
                return res.status(401).json({ message: '리프레시 토큰 만료' });
            }
        }
    }
}