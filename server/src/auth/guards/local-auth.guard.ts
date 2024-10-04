import { IncomingMessage } from 'http';

import { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

import { ExecutionContextService } from '../../execution-context/execution-context.service';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {
  constructor(
    private executionContextService: ExecutionContextService,
  ) {
    super();
  }
  getRequest(context: ExecutionContext): IncomingMessage {
    const request =
      this.executionContextService.getRequestFromContext(context);

    return request;
  }
}
