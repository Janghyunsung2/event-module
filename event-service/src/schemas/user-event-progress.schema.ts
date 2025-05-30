import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventProgressDocument = UserEventProgress & Document;

@Schema({collection: 'user_event_progress' ,timestamps: true })
export class UserEventProgress {

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

}


export const UserEventProgressSchema = SchemaFactory.createForClass(UserEventProgress);

UserEventProgressSchema.pre('save', function (this: any, next) {
  if (
      this.progress &&
      this.progress.length > 0 &&
      this.progress.every((p: any) => p.current >= p.required)
  ) {
    this.status = 'COMPLETED';
  } else {
    this.status = 'IN_PROGRESS';
  }
  next();
});