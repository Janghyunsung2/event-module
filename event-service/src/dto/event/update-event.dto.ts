import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({ description: '이벤트 제목', required: false })
  title?: string;

  @ApiProperty({ description: '이벤트 타입', required: false })
  type?: string;

  @ApiProperty({ description: '수정자 ID', required: false })
  updatedId?: string;

  @ApiProperty({ description: '이벤트 설명', required: false })
  description?: string;

  @ApiProperty({ description: '종료일', required: false, type: Date })
  endAt?: Date;

  @ApiProperty({
    description: '이벤트 상태',
    enum: ['ACTIVE', 'COMPLETED', 'EXPIRED', 'FAILED', 'CANCELLED'],
    required: false,
  })
  status?: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'FAILED' | 'CANCELLED';

  @ApiProperty({
    description: '이벤트 조건 목록',
    type: [Object],
    required: false,
    example: [{ type: '참여', value: 1 }],
  })
  conditions?: { type: string; value: number }[];

}