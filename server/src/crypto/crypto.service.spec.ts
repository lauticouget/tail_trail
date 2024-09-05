import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should return the proper password hash', async () => {
      const password = 'password/12345';
      const hash = service.hashPassword(password);
      let result: boolean;
      try {
        result = await compare(password, hash);
      } finally {
        expect(result).toBeTruthy();
      }
    });
  });
});
