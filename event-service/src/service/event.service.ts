import { Injectable, NotFoundException } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { Event, EventDocument } from '../schemas/event.schema';
        import { CreateEventDto } from '../dto/event/create-event.dto';
        import { UpdateEventDto } from '../dto/event/update-event.dto';
        import { PaginatedResultDto } from '../dto/page/paginated-result.dto';
        import { EventResponseDto } from '../dto/event/event-response.dto';

        function toEventResponseDto(event: Event): EventResponseDto {
            return {
                _id: event._id,
                title: event.title,
                type: event.type,
                creatorId: event.creatorId,
                description: event.description,
                endAt: event.endAt,
                status: event.status,
                conditions: event.conditions,
                rewards: event.rewards,
            };
        }

        @Injectable()
        export class EventService {
            constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

            async create(createDto: CreateEventDto): Promise<EventResponseDto> {
                const event = await this.eventModel.create(createDto);
                return toEventResponseDto(event);
            }

            async findAll({ page, limit, search, status }: { page: number; limit: number; search: string, status: string }): Promise<PaginatedResultDto<EventResponseDto>> {
                const skip = (page - 1) * limit;
                const [data, totalCount] = await Promise.all([
                    this.eventModel.find().skip(skip).limit(limit),
                    this.eventModel.countDocuments(),
                ]);
                return {
                    data: data.map(toEventResponseDto),
                    totalCount,
                    page,
                    limit,
                };
            }

            async findOne(id: string): Promise<EventResponseDto> {
                const found = await this.eventModel.findById(id);
                if (!found) throw new NotFoundException();
                return toEventResponseDto(found);
            }

            async update(id: string, updateDto: UpdateEventDto): Promise<EventResponseDto> {
                const updated = await this.eventModel.findByIdAndUpdate(id, updateDto, { new: true });
                if (!updated) throw new NotFoundException();
                return toEventResponseDto(updated);
            }

            async remove(id: string): Promise<void> {
                const result = await this.eventModel.findByIdAndDelete(id);
                if (!result) throw new NotFoundException();
            }

            async activate(id: string): Promise<EventResponseDto> {
                const updated = await this.eventModel.findByIdAndUpdate(id, { status: "ACTIVE" }, { new: true });
                if (!updated) throw new NotFoundException();
                return toEventResponseDto(updated);
            }

            async deactivate(id: string): Promise<EventResponseDto> {
                const updated = await this.eventModel.findByIdAndUpdate(id, { status: "INACTIVE" }, { new: true });
                if (!updated) throw new NotFoundException();
                return toEventResponseDto(updated);
            }
        }