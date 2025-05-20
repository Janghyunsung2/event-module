import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardRequestDto {
  @ApiProperty({ description: '보상 요청 ID' })
  _id: string;

  @ApiProperty({ description: '이벤트 ID' })
  eventId: string;

  @ApiProperty({ description: '유저 ID', required: false })
  userId: string;

  @ApiProperty({ description: '보상 인덱스' })
  @IsNotEmpty()
  rewardIndex: number;

  @ApiProperty({ description: '요청 일시', required: false, type: Date })
  @IsNotEmpty()
  requestedAt?: Date;

  @ApiProperty({ description: '상태' })
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: '관리자 ID', required: false })
  adminId: string;

  @ApiProperty({ description: '사유', required: false })
  reason: string;

  @ApiProperty({ description: '연결된 보상 로그 ID', required: false })
  linkedRewardLogId: string;
}