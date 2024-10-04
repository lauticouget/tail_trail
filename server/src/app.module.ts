import { join } from 'path';

import { ApolloDriver } from '@nestjs/apollo';
import { Logger, Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import winston from 'winston';

import { AuthModule } from './auth/auth.module';
import { EnvVarKeys, Environments } from './env/env.enum';
import { GraphQLPluginsModule } from './graphql/graphql-plugins.module';
import { GqlRequestContext } from './graphql/types';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(EnvVarKeys.MONGO_URI),
      }),
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule, GraphQLPluginsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: ({ req, res }: GqlRequestContext) => {
          return {
            req,
            res,
          };
        },
        formatError: (error: GraphQLError) => {
          const { message, locations, path, extensions } = error;
          const formattedError = {
            message,
            locations,
            path,
            ...(configService.get<string>(EnvVarKeys.ENV_NAME) ==
            Environments.PROD
              ? {}
              : { extensions }),
          };
          return formattedError;
        },
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: Logger,
      scope: Scope.TRANSIENT,
      inject: [INQUIRER, ConfigService],
      useFactory: (
        parentClass: object,
        configService: ConfigService,
      ) =>
        WinstonModule.createLogger({
          level:
            configService.get<string>(EnvVarKeys.LOGS_LVL) ||
            'info',
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike(
                  `env:${configService.get<string>(EnvVarKeys.ENV_NAME)} | ` +
                    `lvl:${
                      configService.get<string>(
                        EnvVarKeys.LOGS_LVL,
                      ) || 'info'
                    } | ` +
                    `namespace:${parentClass?.constructor?.name}`,
                  {
                    colors: true,
                    prettyPrint: true,
                    processId: true,
                    appName: true,
                  },
                ),
              ),
            }),
          ],
        }),
    },
  ],
  exports: [Logger],
})
export class AppModule {}
