import { Field, ObjectType } from '@nestjs/graphql';

type JwtPayload = {
  subject: string;
  email: string;
};

@ObjectType()
class AccessTokens {
  @Field()
  access_token: string;
  @Field()
  refresh_token: string;
}

export { JwtPayload, AccessTokens };
