import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEventProgress, UserEventProgressSchema } from '../schemas/user-event-progress.schema';
import { UserEventProgressService } from '../service/user-event-progress.service';
import { UserEventProgressController } from '../controller/user-event-progress.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEventProgress.name, schema: UserEventProgressSchema }])],
  controllers: [UserEventProgressController],
  providers: [UserEventProgressService],
})
export class UserEventProgressModule {}