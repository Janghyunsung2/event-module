import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventProgressDocument = UserEventProgress & Document;

@Schema({ timestamps: false })
export class UserEventProgress {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        current: { type: Number, required: true },
        required: { type: Number, required: true }
      }
    ],
    required: true
  })
  progress: { type: string; current: number; required: number }[];

  @Prop({ enum: ['IN_PROGRESS', 'COMPLETED'], required: true })
  status: string;

  @Prop({ required: true })
  lastUpdatedBy: string;

  @Prop({ required: true })
  rewardIssued: boolean;

  @Prop()
  rewardExpiresAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserEventProgressSchema = SchemaFactory.createForClass(UserEventProgress);