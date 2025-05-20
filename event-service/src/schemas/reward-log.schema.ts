import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardLogDocument = RewardLog & Document;

@Schema({collection: 'reward_logs', timestamps: true })
export class RewardLog {

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    units: {
      type: [String],
      required: true,
    },
    itemId: {
      type: String,
      required: false,
    },
    itemName: {
      type: String,
      required: false,
    },
  })
  reward: {
    type: string;
    amount: number;
    units: string[];
    itemId?: string;
    itemName?: string;
  };

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