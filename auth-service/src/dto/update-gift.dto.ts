export class UpdateGiftDto {
  rewards?: { type: string; amount: number; unit: string }[];
  claimed?: boolean;
  expiresAt?: Date;
  updatedAt?: Date;
}