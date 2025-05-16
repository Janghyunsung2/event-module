export class UpdateUserEventProgressDto {
  progress?: { type: string; current: number; required: number }[];
  status?: 'IN_PROGRESS' | 'COMPLETED';
  lastUpdatedBy?: string;
  rewardIssued?: boolean;
  rewardExpiresAt?: Date;
  updatedAt?: Date;
}