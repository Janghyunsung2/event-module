import { Module } from '@nestjs/common';
import { ExternalAuthService } from './service/auth.service.service';
import { HttpModule } from '@nestjs/axios'; // ✅ 이거 추가


@Module({
    imports: [HttpModule],
    providers: [ExternalAuthService],
    exports: [ExternalAuthService],
})

export class ExternalAuthModule {}