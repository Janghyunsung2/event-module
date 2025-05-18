import { Module } from '@nestjs/common';
import { ExternalAuthService } from './service/auth.service.service';
import { HttpModule } from '@nestjs/axios'; // ✅ 이거 추가
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [HttpModule, ConfigModule],
    providers: [ExternalAuthService],
    exports: [ExternalAuthService],
})

export class ExternalAuthModule {}