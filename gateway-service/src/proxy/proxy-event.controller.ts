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
import axios from 'axios';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/role.guard';

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@UseGuards(RolesGuard)
@Controller('events')
export class ProxyEventController {
    // 이벤트
    @Get()
    @HttpCode(HttpStatus.OK)
    async getEvents(@Req() req: Request) {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/events`);
        return data;
    }

    @Roles(Role.ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() body: any) {
        console.log('이벤트 생성 요청:', body);
        const { data } = await axios.post(`${EVENT_SERVICE_URL}/events`, body);
        return data;
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateEvent(@Body() body: any, @Req() req: Request) {
        const { id } = req.params;
        const { data } = await axios.put(`${EVENT_SERVICE_URL}/events/${id}`, body);
        return data;
    }

    // 유저 이벤트 진행상황
    @Get('user-event-progress')
    async getUserEventProgressList() {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/user-event-progress`);
        return data;
    }

    @Get('user-event-progress/:id')
    async getUserEventProgress(@Param('id') id: string) {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/user-event-progress/${id}`);
        return data;
    }

    @Post('user-event-progress')
    async createUserEventProgress(@Body() body: any) {
        const { data } = await axios.post(`${EVENT_SERVICE_URL}/user-event-progress`, body);
        return data;
    }

    @Put('user-event-progress/:id')
    async updateUserEventProgress(@Param('id') id: string, @Body() body: any) {
        const { data } = await axios.put(`${EVENT_SERVICE_URL}/user-event-progress/${id}`, body);
        return data;
    }

    @Roles(Role.ADMIN)
    @Delete('user-event-progress/:id')
    async deleteUserEventProgress(@Param('id') id: string) {
        const { data } = await axios.delete(`${EVENT_SERVICE_URL}/user-event-progress/${id}`);
        return data;
    }

    // 보상 이력
    @Get('reward-logs')
    async getRewardLogs() {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/reward-logs`);
        return data;
    }

    @Get('reward-logs/:id')
    async getRewardLog(@Param('id') id: string) {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/reward-logs/${id}`);
        return data;
    }

    @Roles(Role.ADMIN)
    @Post('reward-logs')
    async createRewardLog(@Body() body: any) {
        const { data } = await axios.post(`${EVENT_SERVICE_URL}/reward-logs`, body);
        return data;
    }

    @Roles(Role.ADMIN)
    @Put('reward-logs/:id')
    async updateRewardLog(@Param('id') id: string, @Body() body: any) {
        const { data } = await axios.put(`${EVENT_SERVICE_URL}/reward-logs/${id}`, body);
        return data;
    }

    @Roles(Role.ADMIN)
    @Delete('reward-logs/:id')
    async deleteRewardLog(@Param('id') id: string) {
        const { data } = await axios.delete(`${EVENT_SERVICE_URL}/reward-logs/${id}`);
        return data;
    }
}