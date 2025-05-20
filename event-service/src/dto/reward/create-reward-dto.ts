import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { RewardUnit } from 'src/schemas/reward.schema';

export class CreateRewardDto {
    @ApiProperty({ description: '보상 타입', example: '포인트' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: '보상 수량', example: 100 })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: '보상 단위', example: ['POINT'], enum: RewardUnit, isArray: true })
    @IsEnum(RewardUnit, { each: true })
    units: RewardUnit[];

    @ApiPropertyOptional({ description: '아이템 ID', example: 'item123' })
    @IsOptional()
    @IsString()
    itemId?: string;

    @ApiPropertyOptional({ description: '아이템 이름', example: '슈퍼소드' })
    @IsOptional()
    @IsString()
    itemName?: string;
}