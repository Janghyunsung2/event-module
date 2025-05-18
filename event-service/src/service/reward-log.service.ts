import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardLog, RewardLogDocument } from '../schemas/reward-log.schema';
import { CreateRewardLogDto } from '../dto/rewardlog/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/rewardlog/update-reward-log.dto';
import {PaginatedResultDto} from "../dto/page/paginated-result.dto";

@Injectable()
export class RewardLogService {
  constructor(
    @InjectModel(RewardLog.name) private rewardLogModel: Model<RewardLogDocument>,
  ) {}

  async create(createRewardLogDto: CreateRewardLogDto): Promise<RewardLog> {
    return this.rewardLogModel.create(createRewardLogDto);
  }

  async findAll({ page, limit, search, status }: { page: number; limit: number; search: string; status: string }): Promise<PaginatedResultDto<RewardLog>> {
    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // title 필드에서 검색
        { description: { $regex: search, $options: 'i' } }, // description 필드에서 검색
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

  async findOne(id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findById(id).exec();
  }

  async update(id: string, updateRewardLogDto: UpdateRewardLogDto): Promise<RewardLog | null> {
    return this.rewardLogModel.findByIdAndUpdate(id, updateRewardLogDto, { new: true }).exec();
  }

  async complete(id: string): Promise<RewardLog | null> {
      return this.rewardLogModel.findByIdAndUpdate(id, { status: 'COMPLETED' }, { new: true }).exec();
  }
  async exprire(id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findByIdAndUpdate(id, {status: 'EXPIRED'}, {new: true}).exec();
  }

  async fail(id: string): Promise<RewardLog | null> {
    return this.rewardLogModel.findByIdAndUpdate(id, {status: 'FAILED'}, {new: true}).exec();
  }
}