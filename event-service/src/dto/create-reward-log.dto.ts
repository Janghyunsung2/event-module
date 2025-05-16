export class CreateRewardLogDto {
  _id: string;
  eventId: string;
  userId: string;
  rewardIndex: number;
  reward: { type: string; amount: number; unit: string };
  issuedAt: Date;
  status: 'ISSUED' | 'REVOKED' | 'FAILED';
  externalTxId?: string;
  externalStatus?: 'SUCCESS' | 'FAIL' | 'PENDING';
  reason?: string;
}