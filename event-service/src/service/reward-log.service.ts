import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardLog, RewardLogDocument } from '../schemas/reward-log.schema';
import { CreateRewardLogDto } from '../dto/rewardlog/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/rewardlog/update-reward-log.dto';
import { PaginatedResultDto } from "../dto/page/paginated-result.dto";

@Injectable()
export class RewardLogService {
  constructor(
    @InjectModel(RewardLog.name) private rewardLogModel: Model<RewardLogDocument>,
  ) {}

  async create(eventId: string, createRewardLogDto: CreateRewardLogDto): Promise<RewardLog> {
    return this.rewardLogModel.create({ ...createRewardLogDto, eventId });
  }

  async findAll(
    eventId: string,
    { page, limit, search, status }: { page: number; limit: number; search: string; status: string }
  ): Promise<PaginatedResultDto<RewardLog>> {
    const skip = (page - 1) * limit;

    const query: any = { eventId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      query.status = status;
    }

    const [data, totalCount] = await Promise.all([
      this.rewardLogModel.find(query).skip(skip).limit(limit).exec(),
      this.rewardLogModel.countDocuments(query),
    ]);

    return { data, totalCount, page, limit };
  }

  async findOne(eventId: string, id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findOne({ _id: id, eventId }).exec();
  }

  async update(eventId: string, id: string, updateRewardLogDto: UpdateRewardLogDto): Promise<RewardLog | null> {
    return this.rewardLogModel.findOneAndUpdate(
      { _id: id, eventId },
      updateRewardLogDto,
      { new: true }
    ).exec();
  }

  async complete(eventId: string, id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'COMPLETED' },
      { new: true }
    ).exec();
  }

  async exprire(eventId: string, id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'EXPIRED' },
      { new: true }
    ).exec();
  }

  async fail(eventId: string, id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'FAILED' },
      { new: true }
    ).exec();
  }
}