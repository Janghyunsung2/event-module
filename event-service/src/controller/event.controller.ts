import { Controller, Get, Post, Body, Param, Patch, Delete, Put, Query, Headers } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { CreateEventDto } from '../dto/event/create-event.dto';
import { UpdateEventDto } from '../dto/event/update-event.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EventResponseDto } from '../dto/event/event-response.dto';
import { PaginatedResultDto } from '../dto/page/paginated-result.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @ApiOperation({ summary: '이벤트 등록' })
    @ApiBody({ type: CreateEventDto })
    @ApiOkResponse({ description: '이벤트 등록 성공', type: EventResponseDto })
    create(
        @Body() dto: CreateEventDto,
        @Headers('x-user-id') userId: string,
    ) {
        dto.creatorId = userId;
        return this.eventService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: '이벤트 페이징 조회' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'status', required: false, type: String })
    @ApiOkResponse({ description: '이벤트 목록', type: PaginatedResultDto })
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search = '',
        @Query('status') status = '',
    ) {
        return this.eventService.findAll({ page: Number(page), limit: Number(limit), search, status });
    }

    @Get(':id')
    @ApiOperation({ summary: '이벤트 단일조회' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiOkResponse({ description: '이벤트 상세', type: EventResponseDto })
    findOne(@Param('id') id: string) {
        return this.eventService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: '이벤트 수정' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiBody({ type: UpdateEventDto })
    @ApiOkResponse({ description: '이벤트 수정 성공', type: EventResponseDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateEventDto,
        @Headers('x-user-id') userId: string,
    ) {
        dto.updatedId = userId;
        return this.eventService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '이벤트 삭제' })
    @ApiResponse({ status: 200, description: '성공' })
    remove(@Param('id') id: string) {
        return this.eventService.remove(id);
    }

    @Patch(':id/activate')
    @ApiOperation({ summary: '이벤트 활성화' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiOkResponse({ description: '이벤트 활성화 성공', type: EventResponseDto })
    activate(@Param('id') id: string) {
        return this.eventService.activate(id);
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: '이벤트 비활성화' })
    @ApiParam({ name: 'id', description: '이벤트 ID' })
    @ApiOkResponse({ description: '이벤트 비활성화 성공', type: EventResponseDto })
    deactivate(@Param('id') id: string) {
        return this.eventService.deactivate(id);
    }
}