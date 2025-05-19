import { Controller, Get, Post, Body, Put, Param, Patch, Delete, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader } from '@nestjs/swagger';
import { UserEventProgressService } from '../service/user-event-progress.service';
import { CreateUserEventProgressDto } from '../dto/usereventprogress/create-user-event-progress.dto';
import { UpdateUserEventProgressDto } from '../dto/usereventprogress/update-user-event-progress.dto';
import { UserEventProgressResponseDto } from '../dto/usereventprogress/user-event-progress-response.dto';
import {PatchUserEventProgressDto} from "../dto/usereventprogress/patch-user-event-progress.dto";

@ApiTags('UserEventProgress')
@Controller('events/:eventId/user-event-progress')
export class UserEventProgressController {
    constructor(private readonly service: UserEventProgressService) {}

    @Post()
    @ApiOperation({ summary: '유저 이벤트 진행 생성' })
    @ApiHeader({ name: 'x-user-id', required: true, description: '유저 ID' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiBody({ type: CreateUserEventProgressDto })
    @ApiResponse({ status: 201, type: UserEventProgressResponseDto })
    create(
        @Param('eventId') eventId: string,
        @Body() dto: CreateUserEventProgressDto,
        @Headers('x-user-id') userId: string,
    ) {
        dto.userId = userId;
        return this.service.create(eventId, dto);
    }

    @Get()
    @ApiOperation({ summary: '유저 이벤트 진행 전체 조회' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiResponse({ status: 200, type: [UserEventProgressResponseDto] })
    findAll(@Param('eventId') eventId: string) {
        return this.service.findAll(eventId);
    }

    @Get(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 단건 조회' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiResponse({ status: 200, type: UserEventProgressResponseDto })
    findOne(@Param('eventId') eventId: string, @Param('id') id: string) {
        return this.service.findOne(eventId, id);
    }

    @Put(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 수정' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiBody({ type: UpdateUserEventProgressDto })
    @ApiResponse({ status: 200, type: UserEventProgressResponseDto })
    update(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() dto: UpdateUserEventProgressDto
    ) {
        return this.service.update(eventId, id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 삭제' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiResponse({ status: 200, description: '성공' })
    remove(@Param('eventId') eventId: string, @Param('id') id: string) {
        return this.service.remove(eventId, id);
    }

    @Patch(':id/progress')
    @ApiOperation({ summary: '유저 이벤트 진행 상황 갱신' })
    @ApiParam({ name: 'eventId', description: '이벤트 ID' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiBody({ type: UpdateUserEventProgressDto })
    @ApiResponse({ status: 200, type: PatchUserEventProgressDto })
    async patchProgress(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() dto: PatchUserEventProgressDto
    ) {
        return this.service.patchProgress(eventId, id, dto);
    }
}