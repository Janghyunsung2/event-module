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
    Query,
    Headers,
    UseGuards,
} from '@nestjs/common';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";
import {AuthGuard} from "@nestjs/passport";

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@UseGuards(RolesGuard)
@Controller('events/:eventId/reward-requests')
export class ProxyRewardRequestController {
    // 보상 요청 생성
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN, Role.USER)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('eventId') eventId: string,
        @Body() body: any,
        @Headers('x-user-id') userId: string,
    ) {
        console.log("body", body);
        body.userId = userId;
        const { data } = await gatewayAxios.post(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests`,
            body,
            { headers: { 'x-user-id': userId } }
        );
        return data;
    }

    // 보상 요청 목록 조회
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN, Role.AUDITOR, Role.OPERATOR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Param('eventId') eventId: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search = '',
        @Query('status') status = ''
    ) {
        const { data } = await gatewayAxios.get(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests`,
            { params: { page, limit, search, status } }
        );
        return data;
    }

    // 보상 요청 단건 조회
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.get(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}`
        );
        return data;
    }

    // 보상 요청 수정
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.put(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}`,
            body
        );
        return data;
    }

    // 보상 요청 삭제
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.delete(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}`
        );
        return data;
    }

    // 상태 PENDING 변경
    @Patch(':id/pending')
    @HttpCode(HttpStatus.OK)
    async pending(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.patch(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}/pending`
        );
        return data;
    }

    // 보상 요청 승인
    @Patch(':id/approve')
    @HttpCode(HttpStatus.OK)
    async approve(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Query('adminId') adminId: string
    ) {
        const { data } = await gatewayAxios.patch(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}/approve`,
            null,
            { params: { adminId } }
        );
        return data;
    }

    // 보상 요청 거절
    @Patch(':id/reject')
    @HttpCode(HttpStatus.OK)
    async reject(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body('adminId') adminId: string,
        @Body('reason') reason: string
    ) {
        const { data } = await gatewayAxios.patch(
            `${EVENT_SERVICE_URL}/events/${eventId}/reward-requests/${id}/reject`,
            { adminId, reason }
        );
        return data;
    }
}