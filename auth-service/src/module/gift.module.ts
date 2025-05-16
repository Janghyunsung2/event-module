import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gift, GiftSchema } from '../schemas/gift.schema';
import { GiftService } from '../service/gift.service';
import { GiftController } from '../controller/gift.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gift.name, schema: GiftSchema }])],
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}