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

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectRedis() private readonly redis: Redis,
    ) {}


    private generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = crypto.randomUUID();
        return { accessToken, refreshToken, payload };
    }

    private async storeRefreshToken(token: string, userId: string) {
        await this.redis.set(`refresh:${token}`, userId, 'EX', 60 * 60 * 3); // 3시간
    }

    private async deleteRefreshToken(token: string) {
        await this.redis.del(`refresh:${token}`);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { accessToken, refreshToken } = this.generateTokens(user);
        await this.storeRefreshToken(refreshToken, user.id.toString());

        return { accessToken, refreshToken };
    }

    async logout(refreshToken: string) {
        const deleted = await this.redis.del(`refresh:${refreshToken}`);
        if (!deleted) {
            throw new UnauthorizedException('Invalid or already expired token');
        }
        return { message: 'Successfully logged out' };
    }

    async refresh(refreshToken: string) {
        const userId = await this.redis.get(`refresh:${refreshToken}`);
        if (!userId) throw new UnauthorizedException('Invalid token');

        const user = await this.userModel.findById(userId);
        if (!user) throw new UnauthorizedException('Invalid token');

        await this.deleteRefreshToken(refreshToken);

        const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(user);
        await this.storeRefreshToken(newRefreshToken, user.id.toString());

        return { accessToken, refreshToken: newRefreshToken };
    }

    async register(userDto: RegisterDto) {
        const { email, password, role, ...rest } = userDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            role,
            ...rest,
        });

        await user.save();
        return { message: 'User registered' };
    }
}
