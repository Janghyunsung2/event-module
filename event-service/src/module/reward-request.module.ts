import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestSchema } from '../schemas/reward-request.schema';
import { RewardRequestService } from '../service/reward-request.service';
import { RewardRequestController } from '../controller/reward-request.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }])],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
})
export class RewardRequestModule {}