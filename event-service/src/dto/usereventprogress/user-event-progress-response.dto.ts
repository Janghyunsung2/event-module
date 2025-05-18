import { ApiProperty } from '@nestjs/swagger';

export class UserEventProgressResponseDto {
  @ApiProperty({ description: '유저 이벤트 진행 ID' })
  _id: string;

  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @ApiProperty({ description: '이벤트 ID' })
  eventId: string;

  @ApiProperty({
    description: '진행 상황 목록',
    type: [Object],
    example: [{ type: '참여', current: 1, required: 3 }]
  })
  progress: { type: string; current: number; required: number }[];

  @ApiProperty({
    description: '상태',
    enum: ['IN_PROGRESS', 'COMPLETED']
  })
  status: 'IN_PROGRESS' | 'COMPLETED';

  @ApiProperty({ description: '마지막 수정자 ID' })
  lastUpdatedBy: string;

  @ApiProperty({ description: '보상 지급 여부' })
  rewardIssued: boolean;

  @ApiProperty({ description: '보상 만료 일시', required: false, type: Date })
  rewardExpiresAt?: Date;

  @ApiProperty({ description: '생성 일시', type: Date })
  createdAt: Date;

  @ApiProperty({ description: '수정 일시', type: Date })
  updatedAt: Date;
}