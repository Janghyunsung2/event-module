import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RewardService } from '../service/reward.service';
import { CreateRewardDto } from '../dto/reward/create-reward-dto';
import { UpdateRewardDto } from '../dto/reward/update-reward-dto';
import { RewardResponseDto } from '../dto/reward/reward-response-dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('rewards')
@Controller('events/:id/rewards')
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @ApiOperation({ summary: '이벤트별 리워드 생성' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiBody({ type: [CreateRewardDto] })
    @ApiResponse({ status: 201, description: '생성된 리워드 목록', type: [RewardResponseDto] })
    @Post()
    async createRewards(
        @Param('id') id: string,
        @Body() createRewardDtos: CreateRewardDto[]
    ): Promise<RewardResponseDto[]> {
        // 배열이 아니면 배열로 변환
        const dtos = Array.isArray(createRewardDtos) ? createRewardDtos : [createRewardDtos];
        return this.rewardService.createRewards(id, dtos);
    }

    @ApiOperation({ summary: '이벤트별 리워드 조회' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiResponse({ status: 200, description: '리워드 목록', type: [RewardResponseDto] })
    @Get()
    async findRewards(@Param('id') id: string): Promise<RewardResponseDto[]> {
        return this.rewardService.findRewardsByEvent(id);
    }

    @ApiOperation({ summary: '리워드 수정' })
    @ApiParam({ name: 'rewardId', description: '리워드 ID' })
    @ApiBody({ type: UpdateRewardDto })
    @ApiResponse({ status: 200, description: '수정된 리워드', type: RewardResponseDto })
    @Put(':rewardId')
    async updateReward(
        @Param('rewardId') rewardId: string,
        @Body() updateRewardDto: UpdateRewardDto
    ): Promise<RewardResponseDto> {
        return this.rewardService.updateReward(rewardId, updateRewardDto);
    }

    @ApiOperation({ summary: '리워드 삭제' })
    @ApiParam({ name: 'rewardId', description: '리워드 ID' })
    @ApiResponse({ status: 200, description: '삭제 완료 메시지', schema: { example: { message: '삭제 완료' } } })
    @Delete(':rewardId')
    async deleteReward(@Param('rewardId') rewardId: string) {
        await this.rewardService.deleteReward(rewardId);
        return { message: '삭제 완료' };
    }
}