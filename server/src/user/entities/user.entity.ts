import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Regex from '../../utils/regex';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
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
}

export const UserSchema = SchemaFactory.createForClass(User);
