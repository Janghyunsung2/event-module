import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus, Get, Param,
    Query,
} from '@nestjs/common';
import { AuthService } from '../service/auth-service.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from "../dto/token.dto";
import {ApiTags, ApiOkResponse, ApiBody, ApiQuery, ApiBearerAuth} from "@nestjs/swagger";
import {MessageDto} from "../dto/message.dto";
import { UserResponse } from "../dto/user-response.dto";
import {PaginatedResultDto} from "../dto/paginated-result.dto";

@ApiTags('auth')
@Controller() // 경로 지정
export class AuthServiceController {
    constructor(private readonly authService: AuthService) {}

    @Post('users')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiOkResponse({ type: MessageDto, description: '회원가입 성공' })
    async register(@Body() registerDto: RegisterDto) : Promise<MessageDto> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiOkResponse({ type: TokenDto, description: '로그인 성공' })
    async login(@Body() loginDto: LoginDto) : Promise<TokenDto> {
        return this.authService.login(loginDto);
    }

    @Get('users/:id')
    @ApiOkResponse({ type: UserResponse, description: '유저조회' })
    @ApiBearerAuth()
    async findOne(@Param('id') id: string): Promise<UserResponse> {
        const user = await this.authService.findOne(id); // user 변수 선언
        const userObj = user.toObject ? user.toObject() : user;
        return {
            id: userObj.id,
            email: userObj.email,
            name: userObj.name,
            nickname: userObj.nickname,
            role: userObj.role,
            createdAt: userObj.createdAt ?? null,
            updatedAt: userObj.updatedAt ?? null,
        };
    }

    @Get('users')
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, example: '' })
    @ApiOkResponse({ type: UserResponse, description: '유저페이징조회' })
    @ApiBearerAuth()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search: string,
    ): Promise<PaginatedResultDto<UserResponse>> {
        return this.authService.findAll(page, limit, search);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: MessageDto, description: '로그아웃 성공' })
    async logout(@Body('refreshToken') refreshToken: string) : Promise<MessageDto> {
        return this.authService.logout(refreshToken);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: TokenDto, description: '토큰 재발급 성공' })
    async refresh(@Body() tokenDto: TokenDto) : Promise<TokenDto> {
        return this.authService.refresh(tokenDto);
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: MessageDto, description: '토큰 검증 성공' })
    async verify(@Body('refreshToken') refreshToken: string) : Promise<MessageDto> {
        return this.authService.verify(refreshToken);
    }
}