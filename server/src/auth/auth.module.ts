import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppModule } from '../app.module';
import { CryptoModule } from '../crypto/crypto.module';
import { ExecutionContextModule } from '../execution-context/execution-context.module';
import { UsersModule } from '../user/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-access.guard';
import { JwtAccessStrategy } from './passport/jwt-access.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtAccessStrategy,
    LocalStrategy,
  ],
  imports: [
    UsersModule,
    JwtModule,
    CryptoModule,
    PassportModule,
    ExecutionContextModule,
    forwardRef(() => AppModule),
  ],
})
export class AuthModule {}
