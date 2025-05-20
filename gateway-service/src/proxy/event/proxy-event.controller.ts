import {
    Body,
    Controller, Get,
    HttpCode,
    HttpStatus,
    Post, Put, Delete,
    Param,
    Req,
    UseGuards, Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";
import {AuthGuard} from "@nestjs/passport";

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

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getEvent(@Param('id') id: string) {
        const { data } = await gatewayAxios.get(`${EVENT_SERVICE_URL}/events/${id}`);
        return data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN, Role.OPERATOR)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() body: any) {
        console.log('이벤트 생성 요청:', body);
        const { data } = await gatewayAxios.post(`${EVENT_SERVICE_URL}/events`, body);
        return data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateEvent(@Body() body: any, @Req() req: Request) {
        const { id } = req.params;
        const { data } = await gatewayAxios.put(`${EVENT_SERVICE_URL}/events/${id}`, body);
        return data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteEvent(@Param('id') id: string) {
        const { data } = await gatewayAxios.delete(`${EVENT_SERVICE_URL}/events/${id}`);
        return data;
    }

    // 관리자 이벤트 활성화
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Patch(':id/activate')
    @HttpCode(HttpStatus.OK)
    async activateEvent(@Param('id') id: string) {
        const { data } = await gatewayAxios.patch(`${EVENT_SERVICE_URL}/events/${id}/activate`);
        return data;
    }

    // 관리자 이벤트 비활성화
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Patch(':id/deactivate')
    @HttpCode(HttpStatus.OK)
    async deactivateEvent(@Param('id') id: string) {
        const { data } = await gatewayAxios.patch(`${EVENT_SERVICE_URL}/events/${id}/deactivate`);
        return data;
    }


}