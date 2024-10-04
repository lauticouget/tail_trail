import { Logger, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { executionContextService } from '../../execution-context/execution-context.service';

export const jwtService = new JwtService({
  secret: process.env.JWT_SECRET_KEY,
});

export const AuthorizationHeader = createParamDecorator(
  (data: unknown, context: GqlExecutionContext) => {
    try {
      const token = executionContextService
        ?.getRequestFromContext(context)
        ?.headers['authorization']?.split(' ')[1];

      if (!token) {
        return null;
      }

      return token;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  },
);
