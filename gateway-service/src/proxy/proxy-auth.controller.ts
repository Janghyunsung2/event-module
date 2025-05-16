import {
    Body,
    Controller,
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
import { TokenDto } from '../dto/token.dto';
import { Request } from 'express';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';

@Controller('auth')
export class ProxyAuthController {
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: any) {
        const { data } = await axios.post(`${AUTH_SERVICE_URL}/register`, body);
        return data;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: any) {
        console.log('✅ auth-service login 도착'); // 확인용

        const { data } = await axios.post(`${AUTH_SERVICE_URL}/login`, body);
        return data;
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('refreshToken') refreshToken: string, @Req() req: Request) {
        console.log('🔐 Gateway Authorization 헤더:', req.headers.authorization);
        const { data } = await axios.post(`${AUTH_SERVICE_URL}/logout`, { refreshToken }, {
        });
        return data;
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(Role.USER, Role.ADMIN, Role.OPERATOR, Role.OPERATOR)
    async refresh(@Body() TokenDto: TokenDto) {
        console.log('/refresh', TokenDto);
        const { data } = await axios.post(`${AUTH_SERVICE_URL}/refresh`, TokenDto, {
        });
        return data;
    }
}