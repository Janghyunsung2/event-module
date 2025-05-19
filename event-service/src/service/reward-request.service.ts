import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardRequest, RewardRequestDocument } from '../schemas/reward-request.schema';
import { CreateRewardRequestDto } from '../dto/rewardrequest/create-reward-request.dto';
import { UpdateRewardRequestDto } from '../dto/rewardrequest/update-reward-request.dto';
import { RewardResponseDto } from '../dto/rewardrequest/reward-response.dto';

function toRewardResponseDto(doc: any): RewardResponseDto {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id: obj._id,
    eventId: obj.eventId,
    userId: obj.userId,
    rewardIndex: obj.rewardIndex,
    requestedAt: obj.requestedAt,
    approvedAt: obj.approvedAt,
    rejectedAt: obj.rejectedAt,
    status: obj.status,
    adminId: obj.adminId,
    reason: obj.reason,
    linkedRewardLogId: obj.linkedRewardLogId,
  };
}

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name) private rewardRequestModel: Model<RewardRequestDocument>,
  ) {}

  async create(eventId: string, dto: CreateRewardRequestDto): Promise<RewardResponseDto> {
    const created = await this.rewardRequestModel.create({ ...dto, eventId });
    return toRewardResponseDto(created);
  }

  async findAll(
    eventId: string,
    { page, limit, search, status }: { page: number; limit: number; search: string; status: string }
  ) {
    const filter: any = { eventId };
    if (search) {
      filter.$or = [
        { userId: { $regex: search, $options: 'i' } },
        { eventId: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      filter.status = status;
    }

    const [data, totalCount] = await Promise.all([
      this.rewardRequestModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ requestedAt: -1 })
        .lean(),
      this.rewardRequestModel.countDocuments(filter),
    ]);

    return {
      data: data.map(toRewardResponseDto),
      totalCount,
      page,
      limit,
    };
  }

  async findOne(eventId: string, id: string): Promise<RewardResponseDto | null> {
    const found = await this.rewardRequestModel.findOne({ _id: id, eventId }).exec();
    return toRewardResponseDto(found);
  }

  async update(eventId: string, id: string, dto: UpdateRewardRequestDto): Promise<RewardResponseDto | null> {
    const updated = await this.rewardRequestModel.findOneAndUpdate(
      { _id: id, eventId },
      dto,
      { new: true }
    ).exec();
    return toRewardResponseDto(updated);
  }

  async remove(eventId: string, id: string): Promise<RewardResponseDto | null> {
    const deleted = await this.rewardRequestModel.findOneAndDelete({ _id: id, eventId }).exec();
    return toRewardResponseDto(deleted);
  }

  async pending(eventId: string, id: string): Promise<RewardResponseDto | null> {
    const updated = await this.rewardRequestModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'PENDING' },
      { new: true }
    ).exec();
    return toRewardResponseDto(updated);
  }

  async approve(eventId: string, id: string, adminId: string): Promise<RewardResponseDto | null> {
    const updated = await this.rewardRequestModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'APPROVED', approvedAt: new Date(), adminId },
      { new: true }
    ).exec();
    return toRewardResponseDto(updated);
  }

  async reject(eventId: string, id: string, adminId: string, reason: string): Promise<RewardResponseDto | null> {
    const updated = await this.rewardRequestModel.findOneAndUpdate(
      { _id: id, eventId },
      { status: 'REJECTED', rejectedAt: new Date(), adminId, reason },
      { new: true }
    ).exec();
    return toRewardResponseDto(updated);
  }
}