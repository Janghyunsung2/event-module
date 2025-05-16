import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GiftService } from '../service/gift.service';
import { CreateGiftDto } from '../dto/create-gift.dto';
import { UpdateGiftDto } from '../dto/update-gift.dto';

@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftService.create(createGiftDto);
  }

  @Get()
  findAll() {
    return this.giftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftService.update(id, updateGiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftService.remove(id);
  }
}