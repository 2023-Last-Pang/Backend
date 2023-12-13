import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/Roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // @Roles 메타데이터로부터 필요한 권한 조회
    const requiredRole = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 권한 제한 없을시 통과
    if (!requiredRole) {
      return true;
    }

    // jwt validate시 생기는 request.user 획득
    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(requiredRole, user.role);
  }

  matchRoles(requiredRoles: Role[], userRole: Role) {
    return requiredRoles.some((role) => role === userRole);
  }
}
