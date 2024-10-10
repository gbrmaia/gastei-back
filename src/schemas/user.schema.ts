import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ String, required: true })
  name: string;

  @Prop({ String, required: true })
  lastname: string;

  @Prop({ String, required: true, unique: true })
  email: string;

  @Prop({ String, required: true })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
