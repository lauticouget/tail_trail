import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';
import { NewUserData } from '../auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOne(
    _id: string,
    email: string,
  ): Promise<UserDocument | null> {
    const result = _id
      ? await this.userModel.findOne({ _id })
      : await this.userModel.findOne({ email });

    return result;
  }

  async create(newUserData: NewUserData): Promise<UserDocument> {
    const user = await this.userModel.create(newUserData);
    return user;
  }
}
