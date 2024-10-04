import { Injectable } from '@nestjs/common';
import { compare, genSaltSync, hashSync } from 'bcrypt';

const rounds = 12;

@Injectable()
export class CryptoService {
  hash(hash: string): string {
    const salt = genSaltSync(rounds);

    return hashSync(hash, salt);
  }
  checkHashes(hash: string, newHash: string): Promise<boolean> {
    return compare(hash, newHash);
  }
}
