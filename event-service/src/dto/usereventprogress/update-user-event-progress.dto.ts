import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserEventProgressDto {
  @ApiProperty({
    description: '진행 상황 목록',
    type: [Object],
    required: false,
    example: [{ type: '참여', current: 1, required: 3 }],
  })
  progress?: { type: string; current: number; required: number }[];

  @ApiProperty({
    description: '상태',
    enum: ['IN_PROGRESS', 'COMPLETED'],
    required: false,
  })
  status?: 'IN_PROGRESS' | 'COMPLETED';

  @ApiProperty({ description: '마지막 수정자 ID', required: false })
  lastUpdatedBy?: string;

  @ApiProperty({ description: '보상 지급 여부', required: false })
  rewardIssued?: boolean;

  @ApiProperty({ description: '보상 만료 일시', required: false, type: Date })
  rewardExpiresAt?: Date;

  @ApiProperty({ description: '수정 일시', required: false, type: Date })
  updatedAt?: Date;
}