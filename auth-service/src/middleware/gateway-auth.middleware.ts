import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const gatewayKey = req.headers['x-gateway-key'];
    console.log('gatewayKey', gatewayKey);
    if (gatewayKey !== process.env.GATEWAY_SECRET) {
      throw new UnauthorizedException('게이트웨이 인증 실패');
    }
    next();
  }
}