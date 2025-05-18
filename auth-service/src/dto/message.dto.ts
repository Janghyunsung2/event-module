import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty({ description: 'message' })
    message: string;
}