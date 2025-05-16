export class UpdateRewardLogDto {
  status?: 'ISSUED' | 'REVOKED' | 'FAILED';
  externalTxId?: string;
  externalStatus?: 'SUCCESS' | 'FAIL' | 'PENDING';
  reason?: string;
}