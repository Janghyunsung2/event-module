import {
        Body,
        Controller, Get,
        HttpCode,
        HttpStatus,
        Post, Put, Delete,
        Param,
        Req,
        UseGuards,
    } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@UseGuards(RolesGuard)
@Controller('events')
export class ProxyEventController {
    // 이벤트
    @Get()
    @HttpCode(HttpStatus.OK)
    async getEvents(@Req() req: Request) {
        const { data } = await gatewayAxios.get(`${EVENT_SERVICE_URL}/events`);
        return data;
    }

    @Roles(Role.ADMIN, Role.OPERATOR)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() body: any) {
        console.log('이벤트 생성 요청:', body);
        const { data } = await gatewayAxios.post(`${EVENT_SERVICE_URL}/events`, body);
        return data;
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateEvent(@Body() body: any, @Req() req: Request) {
        const { id } = req.params;
        const { data } = await gatewayAxios.put(`${EVENT_SERVICE_URL}/events/${id}`, body);
        return data;
    }


}