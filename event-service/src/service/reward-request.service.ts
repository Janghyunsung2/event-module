import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model } from 'mongoose';
import { RewardRequest, RewardRequestDocument } from '../schemas/reward-request.schema';
import { CreateRewardRequestDto } from '../dto/rewardrequest/create-reward-request.dto';
import { UpdateRewardRequestDto } from '../dto/rewardrequest/update-reward-request.dto';
import { RewardResponseDto } from '../dto/rewardrequest/reward-response.dto';
import { RewardLog, RewardLogDocument } from 'src/schemas/reward-log.schema';
import {RewardDocument} from "../schemas/reward.schema";
import {ObjectId} from "mongodb";

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
    @InjectModel(RewardLog.name) private rewardLogModel: Model<RewardLogDocument>,
    @InjectModel('Reward') private rewardModel: Model<RewardDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createAndGrantReward(eventId: string, dto: CreateRewardRequestDto) {
    if(dto._id == null || dto._id == undefined){
      dto._id = new ObjectId().toHexString();
    }

    const alreadyGranted = await this.rewardLogModel.findOne({
      userId: dto.userId,
      eventId,
    });
    if (alreadyGranted) {
      throw new Error('이미 지급된 보상입니다.');
    }

    const rewardRequest = await this.rewardRequestModel.create({
      ...dto,
      eventId,
      status: 'APPROVED',
      reason: '자동 지급',
    });

    const rewards = await this.rewardModel.find({ eventId }).lean();

    for (const reward of rewards) {
      await this.rewardLogModel.create({
        userId: dto.userId,
        eventId,
        rewardRequestId: rewardRequest._id,
        status: 'ISSUED',
        issuedAt: new Date(),
        reward: {
          units: reward.units,
          amount: reward.amount,
          type: reward.type,
            itemId: reward.itemId,
            itemName: reward.itemName,
        },
      });
    }
    return rewardRequest;
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