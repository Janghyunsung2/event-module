
import { Role } from '../../role/role.enum'; // 경로 확인!

export interface AccessRule {
    method: string;              // 예: 'GET', 'POST'
    path: string | RegExp;       // 문자열 또는 정규표현식
    roles: Role[];               // 허용된 역할 목록
}


const AuthAccess: AccessRule[] = [
    { method: 'GET', path: '/auth', roles: [] },
    { method: 'POST', path: '/auth/login', roles: [] },
    { method: 'POST', path: '/auth/register', roles: [] },
    { method: 'POST', path: '/auth/logout', roles: [Role.USER, Role.AUDITOR, Role.OPERATOR, Role.ADMIN] },
    { method: 'POST', path: '/auth/refresh', roles: [] },
    { method: 'GET', path: '/auth/me', roles: [Role.USER, Role.AUDITOR, Role.OPERATOR, Role.ADMIN] },
];

const EventAccess: AccessRule[] = [
    { method: 'GET', path: '/event', roles: [] },
    { method: 'POST', path: '/event/admin/create', roles: [Role.ADMIN] },
    { method: 'GET', path: '/event/rewards', roles: [Role.USER] },
];

export const ACCESS_RULES: AccessRule[] = [
    ...AuthAccess,
    ...EventAccess,
];
