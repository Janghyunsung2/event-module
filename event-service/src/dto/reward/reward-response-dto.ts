import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RewardUnit } from 'src/schemas/reward.schema';

export class RewardResponseDto {
    @ApiProperty({ description: '리워드 ID', example: '664f1c2b2e8b9a0012a4b123' })
    _id: string;

    @ApiProperty({ description: '이벤트 ID', example: '664f1c2b2e8b9a0012a4b111' })
    eventId: string;

    @ApiProperty({ description: '보상 타입', example: '포인트' })
    type: string;

    @ApiProperty({ description: '보상 수량', example: 100 })
    amount: number;

    @ApiProperty({ description: '보상 단위', example: 'POINT', enum: RewardUnit })
    units: RewardUnit[];

    @ApiPropertyOptional({ description: '아이템 ID', example: 'item123' })
    itemId?: string;

    @ApiPropertyOptional({ description: '아이템 이름', example: '슈퍼소드' })
    itemName?: string;
}