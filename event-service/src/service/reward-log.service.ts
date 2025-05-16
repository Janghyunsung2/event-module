import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardLog, RewardLogDocument } from '../schemas/reward-log.schema';
import { CreateRewardLogDto } from '../dto/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/update-reward-log.dto';

@Injectable()
export class RewardLogService {
  constructor(
    @InjectModel(RewardLog.name) private rewardLogModel: Model<RewardLogDocument>,
  ) {}

  async create(createRewardLogDto: CreateRewardLogDto): Promise<RewardLog> {
    return this.rewardLogModel.create(createRewardLogDto);
  }

  async findAll(): Promise<RewardLog[]> {
    return this.rewardLogModel.find().exec();
  }

  async findOne(id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findById(id).exec();
  }

  async update(id: string, updateRewardLogDto: UpdateRewardLogDto): Promise<RewardLog | null> {
    return this.rewardLogModel.findByIdAndUpdate(id, updateRewardLogDto, { new: true }).exec();
  }
}