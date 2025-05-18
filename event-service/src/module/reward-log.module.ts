import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardLog, RewardLogSchema } from '../schemas/reward-log.schema';
import { RewardLogService } from '../service/reward-log.service';
import { RewardLogController } from '../controller/reward-log.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardLog.name, schema: RewardLogSchema }])],
  controllers: [RewardLogController],
  providers: [RewardLogService],
})
export class RewardLogModule {}