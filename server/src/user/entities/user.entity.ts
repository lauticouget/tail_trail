import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { GraphQLTypesFactory } from '../../factories/types.factory';
import Regex from '../../utils/regex.util';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(GraphQLTypesFactory.ID)
  _id: string;

  @Field()
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: String,
    trim: true,
    lowercase: true,
    match: Regex.email,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Field()
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: Regex.nonSpacedName,
  })
  first_name: string;

  @Field()
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: Regex.nonSpacedName,
  })
  last_name: string;

  @Prop({
    type: String,
  })
  jwt_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
