import { Module } from '@nestjs/common';

import { ExecutionContextService } from './execution-context.service';

@Module({
  providers: [ExecutionContextService],
  exports: [ExecutionContextService],
})
export class ExecutionContextModule {}
