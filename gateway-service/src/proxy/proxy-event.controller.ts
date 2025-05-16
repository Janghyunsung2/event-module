import {
    Body,
    Controller, Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Request } from 'express';
import axios from 'axios';


const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:3002';

@Controller('event')
export class ProxyEventController {

    @Get()
    @HttpCode(HttpStatus.OK)
    async getEvents(@Req() req: Request) {
        const { data } = await axios.get(`${EVENT_SERVICE_URL}/`);
        return data;
    }
}