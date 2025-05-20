import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema({collection: 'reward_requests', timestamps: true })
export class RewardRequest {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  requestedAt: Date;

  @Prop()
  approvedAt: Date;

  @Prop()
  rejectedAt: Date;

  @Prop({ enum: ['PENDING', 'APPROVED', 'REJECTED', 'DUPLICATE', 'EXPIRED'], required: true })
  status: string;

  @Prop()
  adminId: string;

  @Prop()
  reason: string;

  @Prop()
  linkedRewardLogId: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

// Unique index 설정
RewardRequestSchema.index({ userId: 1, eventId: 1 }, { unique: true });