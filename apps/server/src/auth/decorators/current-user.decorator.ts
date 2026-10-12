import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../users/interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
