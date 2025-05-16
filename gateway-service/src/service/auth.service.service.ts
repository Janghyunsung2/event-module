import {Injectable, UnauthorizedException} from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import axios from "axios";


@Injectable()
export class ExternalAuthService {
    constructor(private readonly httpService: HttpService) {}

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const { data } = await this.httpService
            .post('http://localhost:3000/refresh', { refreshToken })
            .toPromise();
        return data;
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:3000/verify`, {
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
        const { email } = payload;

        try {
            const response = await axios.get(`http://localhost:3000/auth/users/email/${email}`);
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