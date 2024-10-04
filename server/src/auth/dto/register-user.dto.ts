import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ArgsType()
export class NewUserData {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class SignIn {
  @Field(() => User)
  user: User;
}
