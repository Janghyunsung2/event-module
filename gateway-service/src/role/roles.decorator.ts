import { SetMetadata } from '@nestjs/common';

// 'roles' 라는 키에 전달받은 역할을 배열로 저장함
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);