import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BalanceDocument = Balance & Document;

@Schema()
export class Balance {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
