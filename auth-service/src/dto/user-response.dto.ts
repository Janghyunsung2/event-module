import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: '유저 ID' })
  id: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '닉네임'})
  nickname: string;

  @ApiProperty({ description: '권한' })
  role: string;

  @ApiProperty({ description: '생성일', type: Date })
  createdAt: Date;

  @ApiProperty({ description: '수정일', type: Date })
  updatedAt: Date;
}