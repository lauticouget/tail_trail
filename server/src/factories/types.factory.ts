import { ID } from '@nestjs/graphql';

import { SignIn } from '../auth/dto/register-user.dto';
import { User } from '../user/entities/user.entity';

export class GraphQLTypesFactory {
  static ID = () => ID;
}

export class ModelTypesFactory {
  static User = () => User;
}

export class CompositeTypesFactory {
  static SignIn = () => SignIn;
}
