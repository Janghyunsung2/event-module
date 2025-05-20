import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {EventSchema} from "./schemas/event.schema";
import {EventModule} from "./module/event.module";
import {RewardLogModule} from "./module/reward-log.module";
import {UserEventProgressModule} from "./module/user-event-progress.module";
import {RewardRequestModule} from "./module/reward-request.module";
import {RewardModule} from "./module/reward.module";


@Module({

  imports: [ConfigModule.forRoot({
    isGlobal: true, // 전역 설정
  }),

  MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://localhost:27017/eventdb'),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
    ]),
      EventModule,
      RewardLogModule,
      UserEventProgressModule,
      RewardRequestModule,
      RewardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
