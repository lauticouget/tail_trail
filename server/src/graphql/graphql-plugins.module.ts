import { Module, forwardRef } from '@nestjs/common';

import { AppModule } from '../app.module';
import { GraphQlLoggerPlugin } from './graphql-logger.plugin';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [GraphQlLoggerPlugin],
})
export class GraphQLPluginsModule {}
