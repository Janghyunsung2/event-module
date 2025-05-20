import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {

    @ApiProperty({ description: "이벤트 제목" })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: "이벤트 타입" })
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: "생성자 ID", required: false })
    creatorId: string;

    @ApiProperty({ description: "이벤트 설명", required: false })
    description: string;

    @ApiProperty({ description: "종료일" })
    @IsNotEmpty()
    endAt: Date;

    @ApiProperty({ description: "이벤트 상태", enum: ['ACTIVE', 'COMPLETED', 'EXPIRED', 'FAILED', 'CANCELLED'] })
    @IsNotEmpty()
    status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'FAILED' | 'CANCELLED';

    @ApiProperty({
        description: "이벤트 조건 목록",
        type: [Object],
        example: [{ type: "참여", value: 1 }]
    })
    conditions: { type: string; value: number }[];

}