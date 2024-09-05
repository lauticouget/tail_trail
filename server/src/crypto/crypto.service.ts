import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

const rounds = 12;
const salt = genSaltSync(rounds);

@Injectable()
export class CryptoService {
  hashPassword(password: string): string {
    return hashSync(password, salt);
  }
}
