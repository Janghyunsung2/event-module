import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GiftDocument = Gift & Document;

@Schema()
export class Gift {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        unit: { type: String, required: true }
      }
    ],
    required: true
  })
  rewards: { type: string; amount: number; unit: string }[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  claimed: boolean;

  @Prop()
  expiresAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const GiftSchema = SchemaFactory.createForClass(Gift);