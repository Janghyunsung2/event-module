import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gift, GiftDocument } from '../schemas/gift.schema';
import { CreateGiftDto } from '../dto/create-gift.dto';
import { UpdateGiftDto } from '../dto/update-gift.dto';

@Injectable()
export class GiftService {
  constructor(
    @InjectModel(Gift.name) private giftModel: Model<GiftDocument>,
  ) {}

  async create(dto: CreateGiftDto): Promise<Gift> {
    return this.giftModel.create(dto);
  }

  async findAll(): Promise<Gift[]> {
    return this.giftModel.find().exec();
  }

  async findOne(id: string): Promise<Gift | null> {
    return this.giftModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateGiftDto): Promise<Gift | null> {
    return this.giftModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.giftModel.findByIdAndDelete(id).exec();
  }
}