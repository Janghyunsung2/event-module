import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectRedis } from '@nestjs-modules/ioredis';
import * as crypto from 'crypto';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';
import {RegisterDto} from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { TokenDto } from "../dto/token.dto";
import {MessageDto} from "../dto/message.dto";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectRedis() private readonly redis: Redis,
    ) {}


    private generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30d' });
        const refreshToken = crypto.randomUUID();
        return { accessToken, refreshToken, payload };
    }

    private async storeRefreshToken(token: string, userId: string) {
        await this.redis.set(`refresh:${token}`, userId, 'EX', 60 * 60 * 60 * 24); // 24시간
    }

    private async deleteRefreshToken(token: string) {
        await this.redis.del(`refresh:${token}`);
    }

    private async verifyRefreshToken(refreshToken : string, payload : any) {
        const userId = await this.redis.get(`refresh:${refreshToken}`);
        if (!userId) throw new UnauthorizedException('Invalid token');
        if (userId !== payload.sub) throw new UnauthorizedException('Invalid token');
        return userId;
    }

    async login(loginDto: LoginDto): Promise<TokenDto> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } = this.generateTokens(user);
        await this.storeRefreshToken(refreshToken, user.id.toString());

        //로그인 시간 기록
        await this.userModel.findByIdAndUpdate(user._id, {
            loginAt: new Date(),
        });

        return { accessToken, refreshToken };
    }

    async logout(refreshToken: string) : Promise<MessageDto> {
        const deleted = await this.redis.del(`refresh:${refreshToken}`);
        if (!deleted) {
            throw new UnauthorizedException('Invalid or already expired token');
        }
        return { message: 'Successfully logged out' };
    }

    async refresh(TokenDto: TokenDto) : Promise<TokenDto> {
        const accessToken = TokenDto.accessToken;
        const refreshToken = TokenDto.refreshToken;
        console.log('TokenDto', TokenDto);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        if (!accessToken || !refreshToken) {
            throw new UnauthorizedException('accessToken or refreshToken is missing');
        }

        try {
            const payload = this.jwtService.decode(accessToken) as any;
            console.log('payload', payload);
            if (!payload || typeof payload !== 'object') {
                console.log('Invalid payload');
                throw new UnauthorizedException('Invalid access token');
            }

            const userId = await this.verifyRefreshToken(refreshToken, payload);
            console.log('userId', userId);
            const user = await this.userModel.findById(userId);
            console.log('user', user);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            //리프레시 삭제
            await this.deleteRefreshToken(refreshToken);
            console.log('리프레시 삭제', refreshToken);


            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = this.generateTokens(user);
            console.log("리프레시 재발급")
            await this.storeRefreshToken(newRefreshToken, user.id.toString());

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (e) {
            if (e instanceof UnauthorizedException) {
                console.error(e);
                throw e;
            }
            console.error(e);
            throw new UnauthorizedException('Invalid token');
        }
    }

    async register(userDto: RegisterDto): Promise<MessageDto>  {
        const { email, password, ...rest } = userDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            console.log('existingUser', existingUser);
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            ...rest,
        });

        await user.save();

        return { message: 'User registered' };
    }

    async verify(accessToken: string) : Promise<MessageDto> {
        const payload = this.jwtService.decode(accessToken) as any;
        if (!payload || typeof payload !== 'object') {
            throw new UnauthorizedException('Invalid access token');
        }
        const userId = payload.sub;
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return { message: 'Token is valid' };
    }

    async findOne(id: string) : Promise<User> {
        const user = await this.userModel
            .findById(id)
            .select('-password -__v')
            .exec();
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
