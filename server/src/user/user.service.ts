import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async findOne(_id: string, email: string) {
    const result = _id
      ? await this.userModel.findOne({ _id })
      : await this.userModel.findOne({ email });

    return result;
  }
}
