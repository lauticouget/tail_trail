import { IncomingMessage } from 'http';

import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  GqlContextType,
  GqlExecutionContext,
} from '@nestjs/graphql';

import ExecutionContextTypes from './execution-context.enum';

@Injectable()
export class ExecutionContextService {
  isGqlContext = (context: ExecutionContext): boolean =>
    (context.getType() as string) == ExecutionContextTypes.Graphql;

  transformContextToGql = (
    context: ExecutionContext,
  ): GqlExecutionContext | null =>
    this.isGqlContext(context)
      ? GqlExecutionContext.create(context)
      : null;

  private getRequestFromGqlContext(
    gqlExecutionContext: GqlExecutionContext,
  ): IncomingMessage {
    const gqlContext = gqlExecutionContext.getContext();
    const gqlArgs = gqlExecutionContext.getArgs();

    gqlContext.req.body = { ...gqlContext.req.body, ...gqlArgs };
    return gqlContext.req;
  }

  private getRequestFromHttpContext(
    context: ExecutionContext,
  ): IncomingMessage {
    return context.switchToHttp().getRequest();
  }

  getRequestFromContext(
    context: ExecutionContext,
  ): IncomingMessage {
    const contextType: GqlContextType = context.getType();
    switch (contextType) {
      case ExecutionContextTypes.Graphql: {
        const gqlExecutionContext: GqlExecutionContext =
          this.transformContextToGql(context);

        return this.getRequestFromGqlContext(gqlExecutionContext);
      }
      case ExecutionContextTypes.Http:
        return this.getRequestFromHttpContext(context);
      default:
        throw new Error('Unhandled execution context type');
    }
  }

  attachDataToRequestOrGqlContext(
    data: any,
    context: ExecutionContext,
  ): void {
    const contextType: GqlContextType = context.getType();
    switch (contextType) {
      case ExecutionContextTypes.Graphql:
        {
          const gqlExecutionContext = this.transformContextToGql(
            context,
          ) as GqlExecutionContext;
          const gqlContext = gqlExecutionContext.getContext();
          gqlContext[`${data}`] = data;
        }
        break;
      case ExecutionContextTypes.Http:
        {
          const request = this.getRequestFromContext(context);
          request[`${data}`] = data;
        }
        break;
      default:
        throw new Error('Unhandled execution context type');
    }
  }
}

export const executionContextService =
  new ExecutionContextService();
