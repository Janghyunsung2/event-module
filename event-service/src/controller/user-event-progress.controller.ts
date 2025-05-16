import { Controller, Get, Post, Body,Put, Param, Patch, Delete } from '@nestjs/common';
import { UserEventProgressService } from '../service/user-event-progress.service';
import { CreateUserEventProgressDto } from '../dto/create-user-event-progress.dto';
import { UpdateUserEventProgressDto } from '../dto/update-user-event-progress.dto';

@Controller('user-event-progress')
export class UserEventProgressController {
    constructor(private readonly service: UserEventProgressService) {}

    @Post()
    create(@Body() dto: CreateUserEventProgressDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserEventProgressDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}