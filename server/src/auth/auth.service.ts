import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { CryptoService } from '../crypto/crypto.service';
import { EnvVarKeys } from '../env/env.enum';
import { UserDocument } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
import { AccessTokens, JwtPayload } from './dto/jwt.dto';
import { NewUserData } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private jwtSignOptions: JwtSignOptions;
  private jwtRefreshOptions: JwtSignOptions;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {
    const access_token_secret = this.configService.get<string>(
      EnvVarKeys.JWT_SECRET_KEY,
    );
    const refresh_token_secret = this.configService.get<string>(
      EnvVarKeys.JWT_SECRET_KEY,
    );
    this.jwtSignOptions = {
      secret: access_token_secret,
      expiresIn: '5m',
    };
    this.jwtRefreshOptions = {
      secret: refresh_token_secret,
      expiresIn: '7d',
    };
  }

  async validateLogin(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user: UserDocument | null =
      await this.usersService.findOne(undefined, email);
    if (!user) throw new UnauthorizedException();

    const passwordIsOK = await this.cryptoService.checkHashes(
      password,
      user?.password,
    );

    if (!passwordIsOK) throw new UnauthorizedException();
    return user;
  }

  signJWTAsync(
    jwtPayload: JwtPayload,
    jwtSignOptions: JwtSignOptions,
  ) {
    return this.jwtService.signAsync(jwtPayload, jwtSignOptions);
  }

  async register(
    newUserData: NewUserData,
  ): Promise<{ accessTokens: AccessTokens; user: UserDocument }> {
    newUserData.password = this.cryptoService.hash(
      newUserData.password,
    );
    const user = await this.usersService.create(newUserData);
    const accessTokens = await this.updateUserToken(user);

    return {
      accessTokens,
      user,
    };
  }

  async singIn(
    email: string,
    password: string,
  ): Promise<{ accessTokens: AccessTokens; user: UserDocument }> {
    const user: UserDocument = await this.validateLogin(
      email,
      password,
    );
    const accessTokens = await this.updateUserToken(user);

    return { accessTokens, user };
  }

  async refreshToken(refreshToken: string): Promise<AccessTokens> {
    const jwtPayload: JwtPayload = this.jwtService.verify(
      refreshToken,
      this.jwtRefreshOptions,
    );
    const user = await this.usersService.findOne(
      null,
      jwtPayload.email,
    );

    if (
      !this.cryptoService.checkHashes(
        user.jwt_refresh_token,
        this.cryptoService.hash(refreshToken),
      )
    ) {
      throw new UnauthorizedException();
    }
    const accessTokens = await this.updateUserToken(user);

    return accessTokens;
  }

  async updateUserToken(user: UserDocument): Promise<AccessTokens> {
    const jwtPayload: JwtPayload = {
      subject: user._id,
      email: user.email,
    };
    const new_jwt_refresh_token = await this.signJWTAsync(
      jwtPayload,
      this.jwtRefreshOptions,
    );
    user.jwt_refresh_token = this.cryptoService.hash(
      new_jwt_refresh_token,
    );
    user = await user.save();

    const accessTokens: AccessTokens = {
      access_token: await this.signJWTAsync(
        jwtPayload,
        this.jwtSignOptions,
      ),
      refresh_token: new_jwt_refresh_token,
    };

    return accessTokens;
  }
}
