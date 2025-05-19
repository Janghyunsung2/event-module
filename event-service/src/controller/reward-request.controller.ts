import { Controller, Get, Post, Body, Param, Put, Patch, Delete, HttpCode, HttpStatus, Query, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { RewardRequestService } from '../service/reward-request.service';
import { CreateRewardRequestDto } from '../dto/rewardrequest/create-reward-request.dto';
import { UpdateRewardRequestDto } from '../dto/rewardrequest/update-reward-request.dto';
import { RewardResponseDto } from '../dto/rewardrequest/reward-response.dto';
import { PaginatedResultDto } from '../dto/page/paginated-result.dto';

@ApiTags('RewardRequest')
@Controller('events/:eventId/reward-requests')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '보상 요청 생성' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiBody({ type: CreateRewardRequestDto })
  @ApiResponse({ status: 201, type: RewardResponseDto })
  create(
    @Param('eventId') eventId: string,
    @Body() createDto: CreateRewardRequestDto,
    @Headers('x-user-id') userId: string,
  ) {
    createDto.userId = userId;
    return this.rewardRequestService.create(eventId, createDto);
  }

  @Get()
  @ApiOperation({ summary: '보상 요청 목록 조회' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, type: PaginatedResultDto })
  findAll(
    @Param('eventId') eventId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('status') status = '',
  ) {
    return this.rewardRequestService.findAll(eventId, { page: Number(page), limit: Number(limit), search, status });
  }

  @Get(':id')
  @ApiOperation({ summary: '보상 요청 단건 조회' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiResponse({ status: 200, type: RewardResponseDto })
  findOne(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardRequestService.findOne(eventId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '보상 요청 수정' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiBody({ type: UpdateRewardRequestDto })
  @ApiResponse({ status: 200, type: RewardResponseDto })
  update(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateRewardRequestDto
  ) {
    return this.rewardRequestService.update(eventId, id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '보상 요청 삭제' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiResponse({ status: 200, description: '성공' })
  remove(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardRequestService.remove(eventId, id);
  }

  @Patch(':id/pending')
  @ApiOperation({ summary: '보상 요청 상태를 PENDING으로 변경' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiResponse({ status: 200, type: RewardResponseDto })
  pending(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.rewardRequestService.pending(eventId, id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: '보상 요청 승인' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiParam({ name: 'adminId', description: '관리자 ID' })
  @ApiResponse({ status: 200, type: RewardResponseDto })
  approve(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Param('adminId') adminId: string,
  ) {
    return this.rewardRequestService.approve(eventId, id, adminId);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: '보상 요청 거절' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'id', description: '보상 요청 ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        adminId: { type: 'string', description: '관리자 ID' },
        reason: { type: 'string', description: '거절 사유' },
      },
    },
  })
  @ApiResponse({ status: 200, type: RewardResponseDto })
  reject(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body('adminId') adminId: string,
    @Body('reason') reason: string,
  ) {
    return this.rewardRequestService.reject(eventId, id, adminId, reason);
  }
}