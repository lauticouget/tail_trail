import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CookieSerializeOptions } from 'cookie';

import { CompositeTypesFactory } from '../factories/types.factory';
import { AuthService } from './auth.service';
import { isPublicEndpoint } from './metadata/is-public-endpoint.decorator';
import LocalAuthGuard from './guards/local-auth.guard';
import { NewUserData, SignIn } from './dto/register-user.dto';
import { AccessTokens } from './dto/jwt.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthorizationHeader } from './metadata/jwt-payload.decorator';
import { GqlRequestContext } from '../graphql/types';

@Resolver()
export class AuthResolver {
  private accessTokenKey: string;
  private refreshTokenKey: string;
  private tokenCookieOptions: CookieSerializeOptions;
  constructor(private readonly authService: AuthService) {
    this.accessTokenKey = 'access_token';
    this.refreshTokenKey = 'refresh_token';
    this.tokenCookieOptions = {
      httpOnly: true,
      sameSite: true,
      secure: true,
    };
  }

  @isPublicEndpoint()
  @UseGuards(LocalAuthGuard)
  @Mutation(CompositeTypesFactory.SignIn)
  async signIn(
    @Args({ name: 'email', type: () => String })
    email: string,
    @Args({ name: 'password', type: () => String })
    password: string,
    @Context() context: GqlRequestContext,
  ): Promise<SignIn> {
    const { accessTokens, user } = await this.authService.singIn(
      email,
      password,
    );
    this.setAccessTokenCookies(accessTokens, context);

    return { user };
  }

  @isPublicEndpoint()
  @Mutation(CompositeTypesFactory.SignIn)
  async register(
    @Args() newUserData: NewUserData,
    @Context() context: GqlRequestContext,
  ): Promise<SignIn> {
    const { accessTokens, user } =
      await this.authService.register(newUserData);
    this.setAccessTokenCookies(accessTokens, context);

    return { user };
  }

  @isPublicEndpoint()
  @UseGuards(JwtRefreshGuard)
  @Mutation(() => Boolean)
  async refreshToken(
    @AuthorizationHeader() refreshToken: string,
    @Context() context: GqlRequestContext,
  ) {
    const accessTokens: AccessTokens =
      await this.authService.refreshToken(refreshToken);
    this.setAccessTokenCookies(accessTokens, context);
    return true;
  }

  setAccessTokenCookies(
    accessTokens: AccessTokens,
    context: GqlRequestContext,
  ) {
    context.res.cookie(
      this.accessTokenKey,
      accessTokens.access_token,
      this.tokenCookieOptions,
    );
    context.res.cookie(
      this.refreshTokenKey,
      accessTokens.refresh_token,
      this.tokenCookieOptions,
    );
  }
}
