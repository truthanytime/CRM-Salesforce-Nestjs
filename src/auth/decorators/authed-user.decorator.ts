import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthedUser } from '../types';

export const AuthedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthedUser => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
