import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEventProgress, UserEventProgressDocument } from '../schemas/user-event-progress.schema';
import { CreateUserEventProgressDto } from '../dto/create-user-event-progress.dto';
import { UpdateUserEventProgressDto } from '../dto/update-user-event-progress.dto';

@Injectable()
export class UserEventProgressService {
  constructor(
    @InjectModel(UserEventProgress.name) private progressModel: Model<UserEventProgressDocument>,
  ) {}

  async create(dto: CreateUserEventProgressDto): Promise<UserEventProgress> {
    return this.progressModel.create(dto);
  }

  async findAll(): Promise<UserEventProgress[]> {
    return this.progressModel.find().exec();
  }

  async findOne(id: string): Promise<UserEventProgress | null> {
    return this.progressModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateUserEventProgressDto): Promise<UserEventProgress | null> {
    return this.progressModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.progressModel.findByIdAndDelete(id).exec();
  }
}