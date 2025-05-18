import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus, Get, Param,
} from '@nestjs/common';
    import { AuthService } from '../service/auth-service.service';
    import { RegisterDto } from '../dto/register.dto';
    import { LoginDto } from '../dto/login.dto';
    import { TokenDto } from "../dto/token.dto";
    import { ApiTags, ApiOkResponse, ApiBody } from "@nestjs/swagger";
    import {MessageDto} from "../dto/message.dto";
    import { UserResponse } from "../dto/user-response.dto";

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
            console.log('✅ login 진입', loginDto);
            return this.authService.login(loginDto);
        }

        @Get('users/:id')
        @ApiOkResponse({ type: UserResponse, description: '유저조회' })
        async findOne(@Param('id') id: string): Promise<UserResponse> {
            console.log('✅ findOne 진입', id);
            const user = await this.authService.findOne(id); // user 변수 선언
            const userObj = user.toObject ? user.toObject() : user;
            return {
                id: userObj.id,
                email: userObj.email,
                name: userObj.name,
                role: userObj.role,
                createdAt: userObj.createdAt ?? null,
                updatedAt: userObj.updatedAt ?? null,
            };
        }

        @Post('logout')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({ type: MessageDto, description: '로그아웃 성공' })
        async logout(@Body('refreshToken') refreshToken: string) : Promise<MessageDto> {
            console.log("logout 진입", refreshToken);
            return this.authService.logout(refreshToken);
        }

        @Post('refresh')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({ type: TokenDto, description: '토큰 재발급 성공' })
        async refresh(@Body() tokenDto: TokenDto) : Promise<TokenDto> {
            console.log("refresh 진입", tokenDto);
            return this.authService.refresh(tokenDto);
        }

        @Post('verify')
        @HttpCode(HttpStatus.OK)
        @ApiOkResponse({ type: MessageDto, description: '토큰 검증 성공' })
        async verify(@Body('refreshToken') refreshToken: string) : Promise<MessageDto> {
            console.log("verify 진입", refreshToken);
            return this.authService.verify(refreshToken);
        }
    }