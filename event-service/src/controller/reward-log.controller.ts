import {Controller, Get, Post, Body, Param, Patch, Put} from '@nestjs/common';
import { RewardLogService } from '../service/reward-log.service';
import { CreateRewardLogDto } from '../dto/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/update-reward-log.dto';

@Controller('reward-logs')
export class RewardLogController {
  constructor(private readonly rewardLogService: RewardLogService) {}

  @Post()
  create(@Body() createRewardLogDto: CreateRewardLogDto) {
    console.log(createRewardLogDto);
    return this.rewardLogService.create(createRewardLogDto);
  }

  @Get()
  findAll() {
    return this.rewardLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardLogService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRewardLogDto: UpdateRewardLogDto) {
    return this.rewardLogService.update(id, updateRewardLogDto);
  }
}