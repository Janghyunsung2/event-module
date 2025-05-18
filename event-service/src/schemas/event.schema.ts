import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ collection: 'events', timestamps: true })
export class Event {

    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    title: string;
    @Prop() type: string;
    @Prop() creatorId: string;
    @Prop() updatedId: string;
    @Prop() description: string;

    @Prop() endAt: Date;

    @Prop({ type: [{ type: Object }] })
    conditions: { type: string; value: number }[];

    @Prop({ type: [{ type: Object }] })
    rewards: { type: string; amount: number; unit: string }[];

    @Prop({ enum: ['ACTIVE', 'COMPLETED', 'EXPIRED', 'FAILED', 'CANCELLED'] })
    status: string;

}

export const EventSchema = SchemaFactory.createForClass(Event);


