// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetRefreshToken = createParamDecorator(
//   (data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     return request.headers['x-refresh-token'];
//   },
// );

import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetRefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    return token;
  },
);
