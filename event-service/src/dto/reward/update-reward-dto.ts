import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { RewardUnit } from 'src/schemas/reward.schema';

export class UpdateRewardDto {
    @ApiPropertyOptional({ description: '보상 타입', example: '포인트' })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiPropertyOptional({ description: '보상 수량', example: 100 })
    @IsOptional()
    @IsNumber()
    amount?: number;

    @ApiPropertyOptional({ description: '보상 단위', example: 'POINT', enum: RewardUnit })
    @IsOptional()
    @IsEnum(RewardUnit)
    units?: RewardUnit[];

    @ApiPropertyOptional({ description: '아이템 ID', example: 'item123' })
    @IsOptional()
    @IsString()
    itemId?: string;

    @ApiPropertyOptional({ description: '아이템 이름', example: '슈퍼소드' })
    @IsOptional()
    @IsString()
    itemName?: string;
}