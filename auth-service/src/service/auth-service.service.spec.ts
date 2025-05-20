import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth-service.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

const mockUserModel = {
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  countDocuments: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};

const mockRedis = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  decode: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: 'Redis', useValue: mockRedis },
        { provide: 'default_IORedisModuleConnectionToken', useValue: mockRedis }, // 이 부분 추가

      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return tokens if credentials are valid', async () => {
      const user = { id: '1', email: 'test', password: 'hashed', role: 'USER', _id: '1' };
      mockUserModel.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('access');
      jest.spyOn(service as any, 'generateTokens').mockReturnValue({ accessToken: 'access', refreshToken: 'refresh' });
      mockRedis.set.mockResolvedValue(null);
      mockUserModel.findByIdAndUpdate.mockResolvedValue(null);

      const result = await service.login({ email: 'test', password: 'pw' });
      expect(result).toEqual({ accessToken: 'access', refreshToken: 'refresh' });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      await expect(service.login({ email: 'test', password: 'pw' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should throw ConflictException if email exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(true);
      await expect(service.register({ email: 'a', password: 'b', nickname: 'c' } as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('logout', () => {
    it('should return message if token is deleted', async () => {
      mockRedis.del.mockResolvedValue(1);
      const result = await service.logout('refresh');
      expect(result).toEqual({ message: 'Successfully logged out' });
    });

    it('should throw UnauthorizedException if token is not found', async () => {
      mockRedis.del.mockResolvedValue(0);
      await expect(service.logout('refresh')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('verify', () => {
    it('should return message if token is valid', async () => {
      mockJwtService.decode.mockReturnValue({ sub: '1' });
      mockUserModel.findById.mockResolvedValue(true);
      const result = await service.verify('access');
      expect(result).toEqual({ message: 'Token is valid' });
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      mockJwtService.decode.mockReturnValue(null);
      await expect(service.verify('access')).rejects.toThrow(UnauthorizedException);
    });
  });
});