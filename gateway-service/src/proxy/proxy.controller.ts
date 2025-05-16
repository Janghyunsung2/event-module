import {All, Controller, Req, Res, UnauthorizedException, ForbiddenException, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { ACCESS_RULES } from '../common/access/access.rules';
import { Role } from '../role/role.enum';
import {AccessGuard} from "../common/access/access.guard";
import {JwtWsGuard} from "../jwt/jwt-ws.guard";

const SERVICE_MAP: Record<string, string> = {
    auth: 'http://localhost:3000',
    event: 'http://localhost:3002',
};

@Controller()
@UseGuards(JwtWsGuard, AccessGuard)
export class ProxyController {
    @All('*')
    async proxy(@Req() req: Request, @Res() res: Response) {

        const [ , base ] = req.path.split('/');
        const target = SERVICE_MAP[base];

        if (!target) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const cleanedPath = req.originalUrl.replace(`/${base}`, '') || '/';
        const url = `${target}${cleanedPath}`;

        const config: AxiosRequestConfig = {
            method: req.method as any,
            url,
            headers: {
                ...req.headers,
                host: undefined,
                'content-length': undefined,
            },
            data: ['GET', 'HEAD'].includes(req.method.toUpperCase()) ? undefined : req.body,
        };

        try {
            const response = await axios.request(config);
            return res.status(response.status).send(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            return res.status(status).json({ message: 'Proxy error' });
        }
    }
}