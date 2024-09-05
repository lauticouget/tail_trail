import { ID } from '@nestjs/graphql';

import { User } from '../user/entities/user.entity';

class GraphQLTypesFactory {
  static ID = () => ID;
}

class ModelTypesFactory {
  static User = () => User;
}

export { GraphQLTypesFactory, ModelTypesFactory };
