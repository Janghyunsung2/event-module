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

    @Prop({ required: true , default: 'USER' }) // 기본값을 'user'로 설정
    role: string;

    @Prop({required: true, default: 'ACTIVE'}) // 기본값을 'ACTIVE'로 설정
    status: string;

    @Prop({ default: null }) // 로그인한 시간 기록용
    loginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);