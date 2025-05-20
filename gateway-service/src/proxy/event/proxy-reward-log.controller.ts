import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Patch,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";
import {AuthGuard} from "@nestjs/passport";

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@UseGuards(RolesGuard)
@Controller('events/:eventId/reward-logs')
export class ProxyRewardLogController {
    // 리워드 로그 생성
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('eventId') eventId: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.post(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs`, body);
        return data;
    }

    // 리워드 로그 페이징 조회
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN, Role.AUDITOR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Param('eventId') eventId: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search = '',
        @Query('status') status = ''
    ) {
        const { data } = await gatewayAxios.get(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs`, {
            params: { page, limit, search, status }
        });
        return data;
    }

    // 리워드 로그 단일 조회
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.get(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs/${id}`);
        return data;
    }

    // 리워드 로그 수정
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('eventId') eventId: string,
        @Param('id') id: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.put(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs/${id}`, body);
        return data;
    }

    // 상태 완료
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Patch(':id/complete')
    @HttpCode(HttpStatus.OK)
    async complete(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.patch(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs/${id}/complete`);
        return data;
    }

    // 상태 실패
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Patch(':id/fail')
    @HttpCode(HttpStatus.OK)
    async fail(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.patch(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs/${id}/fail`);
        return data;
    }

    // 상태 만료
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Patch(':id/expire')
    @HttpCode(HttpStatus.OK)
    async expire(
        @Param('eventId') eventId: string,
        @Param('id') id: string
    ) {
        const { data } = await gatewayAxios.patch(`${EVENT_SERVICE_URL}/events/${eventId}/reward-logs/${id}/expire`);
        return data;
    }
}