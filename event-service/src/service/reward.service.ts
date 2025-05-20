import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from '../schemas/reward.schema';
import { CreateRewardDto } from '../dto/reward/create-reward-dto';
import { UpdateRewardDto } from '../dto/reward/update-reward-dto';
import { RewardResponseDto } from '../dto/reward/reward-response-dto';

function toRewardResponseDto(reward: RewardDocument): RewardResponseDto {
    return {
        _id: reward._id.toString(),
        eventId: reward.eventId,
        type: reward.type,
        amount: reward.amount,
        units: reward.units,
        itemId: reward.itemId,
        itemName: reward.itemName,
    };
}

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    ) {}

    async createRewards(eventId: string, createRewardDtos: CreateRewardDto[]): Promise<RewardResponseDto[]> {

        const docs = createRewardDtos.map(dto => ({ ...dto, eventId }));
        const rewards = await this.rewardModel.insertMany(docs);
        return rewards.map(toRewardResponseDto);
    }

    async findRewardsByEvent(eventId: string): Promise<RewardResponseDto[]> {
        const rewards = await this.rewardModel.find({ eventId }).exec();
        return rewards.map(toRewardResponseDto);
    }

    async updateReward(rewardId: string, updateRewardDto: UpdateRewardDto): Promise<RewardResponseDto> {
        const reward = await this.rewardModel.findByIdAndUpdate(
            rewardId,
            updateRewardDto,
            { new: true }
        );
        if (!reward) throw new NotFoundException('리워드를 찾을 수 없습니다.');
        return toRewardResponseDto(reward);
    }

    async deleteReward(rewardId: string): Promise<void> {
        const result = await this.rewardModel.findByIdAndDelete(rewardId);
        if (!result) throw new NotFoundException('리워드를 찾을 수 없습니다.');
    }
}