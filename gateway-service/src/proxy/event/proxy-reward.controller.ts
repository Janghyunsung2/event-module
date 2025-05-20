import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Delete,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../role/role.guard';
import {gatewayAxios} from "../../common/gatewayAxios";
import {AuthGuard} from "@nestjs/passport";

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@UseGuards(RolesGuard)
@Controller('events/:eventId/rewards')
export class ProxyRewardController {
    // 리워드 생성
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN, Role.OPERATOR)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRewards(
        @Param('eventId') eventId: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.post(`${EVENT_SERVICE_URL}/events/${eventId}/rewards`, body);
        return data;
    }

    // 리워드 조회
    @Get()
    @HttpCode(HttpStatus.OK)
    async findRewards(@Param('eventId') eventId: string) {
        const { data } = await gatewayAxios.get(`${EVENT_SERVICE_URL}/events/${eventId}/rewards`);
        return data;
    }

    // 리워드 수정
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Put(':rewardId')
    @HttpCode(HttpStatus.OK)
    async updateReward(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string,
        @Body() body: any
    ) {
        const { data } = await gatewayAxios.put(`${EVENT_SERVICE_URL}/events/${eventId}/rewards/${rewardId}`, body);
        return data;
    }

    // 리워드 삭제
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.ADMIN)
    @Delete(':rewardId')
    @HttpCode(HttpStatus.OK)
    async deleteReward(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string
    ) {
        const { data } = await gatewayAxios.delete(`${EVENT_SERVICE_URL}/events/${eventId}/rewards/${rewardId}`);
        return data;
    }
}