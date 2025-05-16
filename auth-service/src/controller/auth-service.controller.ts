import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../service/auth-service.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { TokenDto} from "../dto/token.dto";

@Controller()
export class AuthServiceController {
    constructor(private readonly authService: AuthService) {}

    @Post('users')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async register(@Body() registerDto: RegisterDto) {
        console.log("register 진입", registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() loginDto: LoginDto) {
        console.log('✅ login 진입', loginDto);
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('refreshToken') refreshToken: string) {
        console.log("logout 진입", refreshToken);
        return this.authService.logout(refreshToken);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() TokenDto: TokenDto) {
        console.log("refresh 진입", TokenDto);
        return this.authService.refresh(TokenDto);
    }
}