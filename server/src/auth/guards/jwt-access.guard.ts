import { IncomingMessage } from 'http';

import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { ExecutionContextService } from '../../execution-context/execution-context.service';
import { IS_PUBLIC_ENDPOINT } from '../metadata/is-public-endpoint.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private executionContextService: ExecutionContextService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicEndpoint =
      this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_ENDPOINT,
        [context.getHandler(), context.getClass()],
      );
    if (isPublicEndpoint) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): IncomingMessage {
    const request =
      this.executionContextService.getRequestFromContext(context);

    return request;
  }
}
