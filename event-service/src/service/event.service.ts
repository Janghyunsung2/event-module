import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

    async create(createDto: CreateEventDto): Promise<Event> {
        return this.eventModel.create(createDto);
    }

    async findAll({ page, limit }: { page: number; limit: number }): Promise<Event[]> {
        const skip = (page - 1) * limit;
        return this.eventModel.find().skip(skip).limit(limit);
    }

    async findOne(id: string): Promise<Event> {
        const found = await this.eventModel.findById(id);
        if (!found) throw new NotFoundException();
        return found;
    }

    async update(id: string, updateDto: UpdateEventDto): Promise<Event> {
        const updated = await this.eventModel.findByIdAndUpdate(id, updateDto, { new: true });
        if (!updated) throw new NotFoundException();
        return updated;
    }

    async remove(id: string): Promise<void> {
        const result = await this.eventModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException();
    }
}
