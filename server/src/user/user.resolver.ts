import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  GraphQLTypesFactory,
  ModelTypesFactory,
} from '../factories/types.factory';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(ModelTypesFactory.User, {
    name: User.name,
    nullable: true,
  })
  findOne(
    @Args('_id', { type: GraphQLTypesFactory.ID, nullable: true })
    _id?: string,
    @Args('email', { type: GraphQLTypesFactory.ID, nullable: true })
    email?: string,
  ) {
    return this.userService.findOne(_id, email);
  }
}
