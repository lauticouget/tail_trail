import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: User.name, nullable: true })
  findOne(
    @Args('_id', { type: () => ID, nullable: true })
    _id: string,
    @Args('email', { type: () => String, nullable: true })
    email: string,
  ) {
    return this.userService.findOne(_id, email);
  }
}
