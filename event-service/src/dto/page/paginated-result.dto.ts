import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto<T> {
  @ApiProperty({ description: '데이터 목록', isArray: true })
  data: T[];

  @ApiProperty({ description: '전체 개수' })
  totalCount: number;

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '페이지당 개수' })
  limit: number;
}