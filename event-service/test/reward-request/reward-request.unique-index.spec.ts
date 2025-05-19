import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardRequest, RewardRequestDocument } from '../../src/schemas/reward-request.schema';

describe('보상 요청 중복저장 방지 테스트', () => {
  let rewardRequestModel: Model<RewardRequestDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(RewardRequest.name),
          useValue: Model,
        },
      ],
    }).compile();

    rewardRequestModel = module.get<Model<RewardRequestDocument>>(getModelToken(RewardRequest.name));
  });

  afterEach(async () => {
    await rewardRequestModel.deleteMany({});
  });

  it('should not allow duplicate (userId, eventId, rewardIndex)', async () => {
    const doc = {
      _id: 'test1',
      userId: 'user1',
      eventId: 'event1',
      rewardIndex: 0,
      status: 'PENDING',
    };
    await rewardRequestModel.create(doc);

    let error: any = null;
    try {
      await rewardRequestModel.create({ ...doc, _id: 'test2' });
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.code).toBe(11000);
  });
});