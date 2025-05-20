import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Headers,
    UseGuards,
} from '@nestjs/common';

import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@Controller('events/:eventId/user-event-progress')
export class ProxyUserEventProgressController {
    // 유저 이벤트 진행 생성
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('eventId') eventId: string,
        @Body() body: any,
        @Headers('x-user-id') userId: string,
    ) {
        const { data } = await gatewayAxios.post(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress`,
            body,
            { headers: { 'x-user-id': userId } }
        );
        return data;
    }

    // 전체 조회
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Param('eventId') eventId: string) {
        const { data } = await gatewayAxios.get(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress`
        );
        return data;
    }

    // 단건 조회
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.get(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress/${id}`
        );
        return data;
    }

    // 수정
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.put(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress/${id}`,
            body
        );
        return data;
    }

    // 삭제
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.delete(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress/${id}`
        );
        return data;
    }

    // 진행 상황 갱신
    @Patch(':id/progress')
    @HttpCode(HttpStatus.OK)
    async patchProgress(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.patch(
            `${EVENT_SERVICE_URL}/events/${eventId}/user-event-progress/${id}/progress`,
            body
        );
        return data;
    }
}