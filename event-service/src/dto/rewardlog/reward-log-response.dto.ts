import { ApiProperty } from '@nestjs/swagger';

export class RewardLogResponseDto {
  @ApiProperty({ description: '보상 로그 ID' })
  _id: string;

  @ApiProperty({ description: '이벤트 ID' })
  eventId: string;

  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @ApiProperty({ description: '보상 타입' })
  rewardType: string;

  @ApiProperty({ description: '보상 수량' })
  amount: number;

  @ApiProperty({ description: '보상 단위' })
  unit: string;

  @ApiProperty({ description: '상태', enum: ['PENDING', 'COMPLETED', 'FAILED', 'EXPIRED'] })
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

  @ApiProperty({ description: '생성일', type: Date })
  createdAt: Date;

  @ApiProperty({ description: '수정일', type: Date })
  updatedAt: Date;
}