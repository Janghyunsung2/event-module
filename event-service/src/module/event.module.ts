import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from '../service/event.service';
import { EventController } from '../controller/event.controller';
import { Event, EventSchema } from '../schemas/event.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}