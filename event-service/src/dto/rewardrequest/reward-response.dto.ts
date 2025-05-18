import { ApiProperty } from '@nestjs/swagger';

export class RewardResponseDto {
  @ApiProperty({ description: '보상 요청 ID' })
  _id: string;

  @ApiProperty({ description: '이벤트 ID' })
  eventId: string;

  @ApiProperty({ description: '유저 ID', required: false })
  userId?: string;

  @ApiProperty({ description: '보상 인덱스' })
  rewardIndex: number;

  @ApiProperty({ description: '요청 일시', type: Date, required: false })
  requestedAt?: Date;

  @ApiProperty({ description: '승인 일시', type: Date, required: false })
  approvedAt?: Date;

  @ApiProperty({ description: '거절 일시', type: Date, required: false })
  rejectedAt?: Date;

  @ApiProperty({ description: '상태' })
  status: string;

  @ApiProperty({ description: '관리자 ID', required: false })
  adminId?: string;

  @ApiProperty({ description: '사유', required: false })
  reason?: string;

  @ApiProperty({ description: '연결된 보상 로그 ID', required: false })
  linkedRewardLogId?: string;
}