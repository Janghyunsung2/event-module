import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardLogDocument = RewardLog & Document;

@Schema({collection: 'reward_logs', timestamps: true })
export class RewardLog {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  rewardIndex: number;

  @Prop({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  })
  reward: { type: string; amount: number; unit: string };

  @Prop({ required: true })
  issuedAt: Date;

  @Prop({ enum: ['ISSUED', 'REVOKED', 'FAILED'], required: true })
  status: string;

  @Prop()
  externalTxId: string;

  @Prop({ enum: ['SUCCESS', 'FAIL', 'PENDING'] })
  externalStatus: string;

  @Prop()
  reason: string;

  @Prop()
  requestedByUser: boolean; // 사용자 요청 여부

  @Prop()
  approvedByAdmin: String; // 관리자 아이디

  @Prop()
  requestId : String;

}

export const RewardLogSchema = SchemaFactory.createForClass(RewardLog);