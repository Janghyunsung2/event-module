import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

export enum RewardUnit {
    POINT = 'POINT',
    MESO = 'MESO',
    WON = 'WON',
    ITEM = 'ITEM',
}

@Schema({collection: 'rewards', timestamps: true })
export class Reward {
    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ type: [String], enum: RewardUnit, required: true })
    units: RewardUnit[];

    @Prop()
    itemId?: string;

    @Prop()
    itemName?: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);