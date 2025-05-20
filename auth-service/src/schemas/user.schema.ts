import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'users', timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true , unique: true})
    nickname: string;

    @Prop({ required: true , default: 'USER' })
    role: string;

    @Prop({required: true, default: 'ACTIVE'})
    status: string;

    @Prop({ default: null })
    loginAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);