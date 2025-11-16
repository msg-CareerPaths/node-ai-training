import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserData } from '../types/jwt.types';

export const User = createParamDecorator(
    (data: keyof AuthUserData | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<{ user: AuthUserData }>();
        return request.user;
    }
);
