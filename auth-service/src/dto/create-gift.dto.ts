export class CreateGiftDto {
  _id: string;
  userId: string;
  rewards: { type: string; amount: number; unit: string }[];
  source: string;
  claimed: boolean;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}