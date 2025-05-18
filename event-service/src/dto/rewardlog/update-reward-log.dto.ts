import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardLogDto {
  @ApiProperty({
    description: '상태',
    enum: ['ISSUED', 'REVOKED', 'FAILED'],
    required: false,
  })
  status?: 'ISSUED' | 'REVOKED' | 'FAILED';

  @ApiProperty({ description: '외부 트랜잭션 ID', required: false })
  externalTxId?: string;

  @ApiProperty({
    description: '외부 상태',
    enum: ['SUCCESS', 'FAIL', 'PENDING'],
    required: false,
  })
  externalStatus?: 'SUCCESS' | 'FAIL' | 'PENDING';

  @ApiProperty({ description: '사유', required: false })
  reason?: string;
}