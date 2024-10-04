import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { EnvVarKeys } from './env/env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(Logger);
  app.use(cookieParser());
  const port = app.get(ConfigService).get(EnvVarKeys.PORT);
  await app.listen(port);
}
bootstrap();
