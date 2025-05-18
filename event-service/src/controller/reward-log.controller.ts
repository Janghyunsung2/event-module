import { Controller, Get, Post, Body, Param, Patch, Put, Query } from '@nestjs/common';
import { RewardLogService } from '../service/reward-log.service';
import { CreateRewardLogDto } from '../dto/rewardlog/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/rewardlog/update-reward-log.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RewardLogResponseDto } from '../dto/rewardlog/reward-log-response.dto';
import { PaginatedResultDto } from '../dto/page/paginated-result.dto';

@ApiTags('reward-logs')
@Controller('reward-logs')
export class RewardLogController {
  constructor(private readonly rewardLogService: RewardLogService) {}

  @Post()
  @ApiOperation({ summary: '이벤트 보상 로그 등록' })
  @ApiBody({ type: CreateRewardLogDto })
  @ApiOkResponse({ description: '등록된 보상 로그', type: RewardLogResponseDto })
  create(@Body() createRewardLogDto: CreateRewardLogDto) {
    return this.rewardLogService.create(createRewardLogDto);
  }

  @Get()
  @ApiOperation({ summary: '이벤트 보상 로그 페이징 조회' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiOkResponse({ description: '보상 로그 목록', type: PaginatedResultDto })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('status') status = ''
  ) {
    return this.rewardLogService.findAll({ page: Number(page), limit: Number(limit), search, status });
  }

  @Get(':id')
  @ApiOperation({ summary: '이벤트 보상 로그 단일조회' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '보상 로그 상세', type: RewardLogResponseDto })
  findOne(@Param('id') id: string) {
    return this.rewardLogService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '이벤트 보상 로그 수정' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiBody({ type: UpdateRewardLogDto })
  @ApiOkResponse({ description: '수정된 보상 로그', type: RewardLogResponseDto })
  update(@Param('id') id: string, @Body() updateRewardLogDto: UpdateRewardLogDto) {
    return this.rewardLogService.update(id, updateRewardLogDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '이벤트 보상 로그 상태완료' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 완료된 보상 로그', type: RewardLogResponseDto })
  complete(@Param('id') id: string) {
    return this.rewardLogService.complete(id);
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: '이벤트 보상 로그 상태실패' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 실패된 보상 로그', type: RewardLogResponseDto })
  fail(@Param('id') id: string) {
    return this.rewardLogService.fail(id);
  }

  @Patch(':id/expire')
  @ApiOperation({ summary: '이벤트 보상 로그 상태만료' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 만료된 보상 로그', type: RewardLogResponseDto })
  exprire(@Param('id') id: string) {
    return this.rewardLogService.exprire(id);
  }
}