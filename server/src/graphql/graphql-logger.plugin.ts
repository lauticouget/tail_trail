import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@Plugin()
export class GraphQlLoggerPlugin implements ApolloServerPlugin {
  constructor(private logger: Logger) {}

  async unexpectedErrorProcessingRequest({
    requestContext,
    error,
  }: {
    requestContext: GraphQLRequestContext<any>;
    error: Error;
  }): Promise<void> {
    this.logger.error(error.message, error.stack, requestContext);
  }

  async contextCreationDidFail?({
    error,
  }: {
    error: Error;
  }): Promise<void> {
    this.logger.error({ error });
  }

  async requestDidStart(
    requestContext: GraphQLRequestContext<any>,
  ): Promise<void | GraphQLRequestListener<any>> {
    this.logger.log({
      requestDidStart: { request: requestContext.request },
    });
    const requestListener: GraphQLRequestListener<any> = {
      willSendResponse: async (
        requestContext: GraphQLRequestContextWillSendResponse<any>,
      ) => {
        this.willSendResponse(requestContext);
      },
    };
    return requestListener;
  }

  async willSendResponse(
    requestContext: GraphQLRequestContextWillSendResponse<any>,
  ): Promise<void> {
    this.logger.log({
      willSendResponse: {
        request: requestContext.request,
        response: requestContext.response,
      },
    });
  }

  async didEncounterErrors(
    requestContext: GraphQLRequestContextDidEncounterErrors<any>,
  ): Promise<void> {
    this.logger.error({ requestContext });
  }
}
