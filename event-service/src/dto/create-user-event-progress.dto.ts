export class CreateUserEventProgressDto {
  _id: string;
  userId: string;
  eventId: string;
  progress: { type: string; current: number; required: number }[];
  status: 'IN_PROGRESS' | 'COMPLETED';
  lastUpdatedBy: string;
  rewardIssued: boolean;
  rewardExpiresAt?: Date;
  updatedAt?: Date;
}