import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ACCESS_RULES } from './access.rules';
import { Request } from 'express';
import { Role } from '../../role/role.enum';

@Injectable()
export class AccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();
        const userRole = (req as any).user?.role as Role;

        const matchedRule = ACCESS_RULES.find(rule =>
            rule.method === req.method &&
            (typeof rule.path === 'string' ? rule.path === req.path : rule.path.test(req.path))
        );

        if (matchedRule) {
            if (matchedRule.roles.length > 0 && !userRole) {
                throw new UnauthorizedException('로그인이 필요합니다.');
            }

            if (matchedRule.roles.length > 0 && !matchedRule.roles.includes(userRole)) {
                throw new ForbiddenException('접근 권한이 없습니다.');
            }
        }

        return true;
    }
}