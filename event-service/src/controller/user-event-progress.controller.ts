import { Controller, Get, Post, Body, Put, Param, Patch, Delete, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader } from '@nestjs/swagger';
import { UserEventProgressService } from '../service/user-event-progress.service';
import { CreateUserEventProgressDto } from '../dto/usereventprogress/create-user-event-progress.dto';
import { UpdateUserEventProgressDto } from '../dto/usereventprogress/update-user-event-progress.dto';
import { UserEventProgressResponseDto } from '../dto/usereventprogress/user-event-progress-response.dto';

@ApiTags('UserEventProgress')
@Controller('user-event-progress')
export class UserEventProgressController {
    constructor(private readonly service: UserEventProgressService) {}

    @Post()
    @ApiOperation({ summary: '유저 이벤트 진행 생성' })
    @ApiHeader({ name: 'x-user-id', required: true, description: '유저 ID' })
    @ApiBody({ type: CreateUserEventProgressDto })
    @ApiResponse({ status: 201, type: UserEventProgressResponseDto })
    create(
        @Body() dto: CreateUserEventProgressDto,
        @Headers('x-user-id') userId: string,
    ) {
        dto.userId = userId;
        return this.service.create(dto);
    }

    @Get()
    @ApiOperation({ summary: '유저 이벤트 진행 전체 조회' })
    @ApiResponse({ status: 200, type: [UserEventProgressResponseDto] })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 단건 조회' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiResponse({ status: 200, type: UserEventProgressResponseDto })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 수정' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiBody({ type: UpdateUserEventProgressDto })
    @ApiResponse({ status: 200, type: UserEventProgressResponseDto })
    update(@Param('id') id: string, @Body() dto: UpdateUserEventProgressDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '유저 이벤트 진행 삭제' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiResponse({ status: 200, description: '성공' }) // type 생략
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }


    //TODO: 이거는 나중에 수정해야함
    @Patch(':id/progress')
    @ApiOperation({ summary: '유저 이벤트 진행 상황 갱신' })
    @ApiParam({ name: 'id', description: '유저 이벤트 진행 ID' })
    @ApiBody({ type: UpdateUserEventProgressDto })
    @ApiResponse({ status: 200, type: UserEventProgressResponseDto })
    async patchProgress(
        @Param('id') id: string,
        @Body() dto: UpdateUserEventProgressDto
    ) {
        return this.service.updateProgress(id, dto);
    }
}