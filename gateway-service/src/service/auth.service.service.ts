import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from "axios";

@Injectable()
export class ExternalAuthService {
    private readonly authServiceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const { data } = await this.httpService
            .post(`${this.authServiceUrl}/refresh`, { refreshToken })
            .toPromise();
        return data;
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const response = await axios.get(`${this.authServiceUrl}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new UnauthorizedException('토큰 검증 실패');
        }
    }

    async validateUserByPayload(payload: any) {
        const { sub } = payload;


        try {
            const response = await axios.get(`${this.authServiceUrl}/users/${sub}`);
            const user = response.data;

            if (!user) {
                throw new UnauthorizedException('유저를 찾을 수 없습니다');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('유저 조회 실패');
        }
    }
}