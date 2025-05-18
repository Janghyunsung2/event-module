import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
    @ApiProperty({ description: '이벤트 ID' })
    _id: string;

    @ApiProperty({ description: '이벤트 제목' })
    title: string;

    @ApiProperty({ description: '이벤트 타입' })
    type: string;

    @ApiProperty({ description: '생성자 ID' })
    creatorId: string;

    @ApiProperty({ description: '이벤트 설명', required: false })
    description?: string;

    @ApiProperty({ description: '종료일' })
    endAt: Date;

    @ApiProperty({
        description: '이벤트 상태',
        enum: ['ACTIVE', 'COMPLETED', 'EXPIRED', 'FAILED', 'CANCELLED'],
    })
    status: string;

    @ApiProperty({
        description: '이벤트 조건 목록',
        type: [Object],
        example: [{ type: '참여', value: 1 }],
    })
    conditions: { type: string; value: number }[];

    @ApiProperty({
        description: '이벤트 보상 목록',
        type: [Object],
        example: [{ type: '포인트', amount: 100, unit: 'P' }],
    })
    rewards: { type: string; amount: number; unit: string }[];
}