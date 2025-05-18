import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardRequestDto {
  @ApiProperty({ description: '승인 일시', required: false, type: Date })
  approvedAt?: Date;

  @ApiProperty({ description: '거절 일시', required: false, type: Date })
  rejectedAt?: Date;

  @ApiProperty({ description: '상태', required: false })
  status?: string;

  @ApiProperty({ description: '관리자 ID', required: false })
  adminId?: string;

  @ApiProperty({ description: '사유', required: false })
  reason?: string;

  @ApiProperty({ description: '연결된 보상 로그 ID', required: false })
  linkedRewardLogId?: string;
}