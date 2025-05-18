import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardLogDto {
  @ApiProperty({ description: '보상 로그 ID' })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({ description: '이벤트 ID' })
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ description: '유저 ID' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: '보상 인덱스' })
  @IsNotEmpty()
  rewardIndex: number;

  @ApiProperty({
    description: '보상 정보',
    type: Object,
    example: { type: '포인트', amount: 100, unit: 'P' },
  })
  @IsNotEmpty()
  reward: { type: string; amount: number; unit: string };

  @ApiProperty({ description: '발급 일시', required: false, type: Date })
  issuedAt: Date;

  @ApiProperty({
    description: '상태',
    enum: ['ISSUED', 'REVOKED', 'FAILED'],
  })
  @IsNotEmpty()
  status: 'ISSUED' | 'REVOKED' | 'FAILED';

  @ApiProperty({ description: '외부 트랜잭션 ID', required: false })
  @IsNotEmpty()
  externalTxId?: string;

  @ApiProperty({
    description: '외부 상태',
    enum: ['SUCCESS', 'FAIL', 'PENDING'],
    required: false,
  })
  @IsNotEmpty()
  externalStatus?: 'SUCCESS' | 'FAIL' | 'PENDING';

  @ApiProperty({ description: '사유', required: false })
  reason?: string;
}