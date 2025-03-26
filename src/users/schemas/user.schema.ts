import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document; // User is the class and Document is the mongoose type

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
