import { Controller, Get, Post, Body, Param, Patch, Put, Query } from '@nestjs/common';
import { RewardLogService } from '../service/reward-log.service';
import { CreateRewardLogDto } from '../dto/rewardlog/create-reward-log.dto';
import { UpdateRewardLogDto } from '../dto/rewardlog/update-reward-log.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RewardLogResponseDto } from '../dto/rewardlog/reward-log-response.dto';
import { PaginatedResultDto } from '../dto/page/paginated-result.dto';

@ApiTags('reward-logs')
@Controller('events/:eventId/reward-logs')
export class RewardLogController {
  constructor(private readonly rewardLogService: RewardLogService) {}

  @Post()
  @ApiOperation({ summary: '이벤트 보상 로그 등록' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiBody({ type: CreateRewardLogDto })
  @ApiOkResponse({ description: '등록된 보상 로그', type: RewardLogResponseDto })
  create(
    @Param('eventId') eventId: string,
    @Body() createRewardLogDto: CreateRewardLogDto
  ) {
    return this.rewardLogService.create(eventId, createRewardLogDto);
  }

  @Get()
  @ApiOperation({ summary: '이벤트 보상 로그 페이징 조회' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiOkResponse({ description: '보상 로그 목록', type: PaginatedResultDto })
  findAll(
    @Param('eventId') eventId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('status') status = ''
  ) {
    return this.rewardLogService.findAll(eventId, { page: Number(page), limit: Number(limit), search, status });
  }

  @Get(':id')
  @ApiOperation({ summary: '이벤트 보상 로그 단일조회' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '보상 로그 상세', type: RewardLogResponseDto })
  findOne(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardLogService.findOne(eventId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '이벤트 보상 로그 수정' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiBody({ type: UpdateRewardLogDto })
  @ApiOkResponse({ description: '수정된 보상 로그', type: RewardLogResponseDto })
  update(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body() updateRewardLogDto: UpdateRewardLogDto
  ) {
    return this.rewardLogService.update(eventId, id, updateRewardLogDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '이벤트 보상 로그 상태완료' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 완료된 보상 로그', type: RewardLogResponseDto })
  complete(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardLogService.complete(eventId, id);
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: '이벤트 보상 로그 상태실패' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 실패된 보상 로그', type: RewardLogResponseDto })
  fail(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardLogService.fail(eventId, id);
  }

  @Patch(':id/expire')
  @ApiOperation({ summary: '이벤트 보상 로그 상태만료' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 로그 ID' })
  @ApiOkResponse({ description: '상태 만료된 보상 로그', type: RewardLogResponseDto })
  exprire(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardLogService.exprire(eventId, id);
  }
}