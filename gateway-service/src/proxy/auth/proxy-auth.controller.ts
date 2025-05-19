import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Get,
    Put,
    Delete,
    UseGuards,
    Param,
    Res,
    Query
} from '@nestjs/common';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../role/role.guard';
import { TokenDto } from '../../dto/token.dto';
import { Request } from 'express';
import {gatewayAxios} from "../../common/gatewayAxios";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';

@UseGuards(RolesGuard)
@Controller('auth')
export class ProxyAuthController {
    @Post('users')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: any) {
        console.log('회원가입 요청:', body);
        const { data } = await gatewayAxios.post(`${AUTH_SERVICE_URL}/users`, body);
        return data;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: any) {
        console.log('로그인 요청:', body);
        const { data } = await gatewayAxios.post(`${AUTH_SERVICE_URL}/login`, body);
        return data;
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('refreshToken') refreshToken: string, @Req() req: Request) {
        console.log('🔐 Gateway Authorization 헤더:', req.headers.authorization);
        const { data } = await gatewayAxios.post(`${AUTH_SERVICE_URL}/logout`, { refreshToken }, {
        });
        return data;
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(Role.USER, Role.ADMIN, Role.OPERATOR, Role.OPERATOR)
    async refresh(@Body() TokenDto: TokenDto) {
        console.log('/refresh', TokenDto);
        const { data } = await gatewayAxios.post(`${AUTH_SERVICE_URL}/refresh`, TokenDto, {
        });
        return data;
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'))
    @Get('users/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const { data } = await gatewayAxios.get(`${AUTH_SERVICE_URL}/users/${id}`);
        return data;
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'))
    @Get('users')
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search: string,
    ) {
        const { data } = await gatewayAxios.get(`${AUTH_SERVICE_URL}/users`, {
            params: { page, limit, search },
        });
        return data;
    }




}