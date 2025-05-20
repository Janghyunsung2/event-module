import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserIdHeaderMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const payload: any = this.jwtService.decode(token);
                if (payload && payload.sub) {
                    req.headers['x-user-id'] = payload.sub;
                }
            } catch (e) {
                // 무시하고 통과
            }
        }
        next();
    }
}