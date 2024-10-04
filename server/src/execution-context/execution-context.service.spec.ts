import { Test, TestingModule } from '@nestjs/testing';

import { ExecutionContextService } from './execution-context.service';

describe('ExecutionContextService', () => {
  let service: ExecutionContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionContextService],
    }).compile();

    service = module.get<ExecutionContextService>(ExecutionContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
