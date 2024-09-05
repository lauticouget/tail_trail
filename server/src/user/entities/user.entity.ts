import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import Regex from '../../utils/regex.util';
import { GraphQLTypesFactory } from '../../factories/types.factory';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(GraphQLTypesFactory.ID)
  _id: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
    type: String,
    trim: true,
    lowercase: true,
    match: Regex.email,
  })
  @Field()
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  @Field()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
