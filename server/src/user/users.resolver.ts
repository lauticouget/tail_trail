import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  GraphQLTypesFactory,
  ModelTypesFactory,
} from '../factories/types.factory';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { isPublicEndpoint } from '../auth/metadata/is-public-endpoint.decorator';

@isPublicEndpoint()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(ModelTypesFactory.User, {
    name: User.name,
    nullable: true,
  })
  async findOne(
    @Args('_id', {
      type: GraphQLTypesFactory.ID,
      nullable: true,
    })
    _id?: string,
    @Args('email', {
      type: () => String,
      nullable: true,
    })
    email?: string,
  ) {
    const user = await this.usersService.findOne(_id, email);
    return user;
  }
}
