import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEventProgress, UserEventProgressDocument } from '../schemas/user-event-progress.schema';
import { CreateUserEventProgressDto } from '../dto/usereventprogress/create-user-event-progress.dto';
import { UpdateUserEventProgressDto } from '../dto/usereventprogress/update-user-event-progress.dto';
import { UserEventProgressResponseDto } from '../dto/usereventprogress/user-event-progress-response.dto';
import {PatchUserEventProgressDto} from "../dto/usereventprogress/patch-user-event-progress.dto";

@Injectable()
export class UserEventProgressService {
  constructor(
    @InjectModel(UserEventProgress.name) private progressModel: Model<UserEventProgressDocument>,
  ) {}

  private toResponseDto(doc: UserEventProgressDocument): UserEventProgressResponseDto {
    if (!doc) return null;
    const obj = doc.toObject();
    return {
      _id: obj._id,
      userId: obj.userId,
      eventId: obj.eventId,
      progress: obj.progress,
      status: obj.status,
      lastUpdatedBy: obj.lastUpdatedBy,
      rewardIssued: obj.rewardIssued,
      rewardExpiresAt: obj.rewardExpiresAt,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  async create(eventId: string, dto: CreateUserEventProgressDto): Promise<UserEventProgressResponseDto> {
    const created = await this.progressModel.create({ ...dto, eventId });
    return this.toResponseDto(created);
  }

  async findAll(eventId: string): Promise<UserEventProgressResponseDto[]> {
    const docs = await this.progressModel.find({ eventId }).exec();
    return docs.map(doc => this.toResponseDto(doc));
  }

  async findOne(eventId: string, id: string): Promise<UserEventProgressResponseDto | null> {
    const doc = await this.progressModel.findOne({ _id: id, eventId }).exec();
    return this.toResponseDto(doc);
  }

  async update(eventId: string, id: string, dto: UpdateUserEventProgressDto): Promise<UserEventProgressResponseDto | null> {
    const updated = await this.progressModel.findOneAndUpdate(
      { _id: id, eventId },
      dto,
      { new: true }
    ).exec();
    return this.toResponseDto(updated);
  }

  async remove(eventId: string, id: string): Promise<UserEventProgressResponseDto | null> {
    const deleted = await this.progressModel.findOneAndDelete({ _id: id, eventId }).exec();
    return this.toResponseDto(deleted);
  }

  async patchProgress(eventId: string, id: string, dto: Partial<PatchUserEventProgressDto>): Promise<UserEventProgressResponseDto | null> {
    const doc = await this.progressModel.findOne({ _id: id, eventId });
    if (!doc) return null;

    let status = dto.status ?? doc.status;
    const progress = dto.progress ?? doc.progress;

    const isCompleted = progress.every(
        (item: any) => item.current >= item.required
    );
    if (isCompleted) {
      status = 'COMPLETED';
    }

    const updated = await this.progressModel.findOneAndUpdate(
        { _id: id, eventId },
        { ...dto, status, updatedAt: new Date() },
        { new: true }
    ).exec();
    return this.toResponseDto(updated);
  }
}