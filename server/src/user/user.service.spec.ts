import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';

import { UserService } from './user.service';
import { User, UserDocument } from './entities/user.entity';
import { getMockedUser, mockedUserModel } from './user.mocker';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockedUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(
      getModelToken(User.name),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('by id should return a user', async () => {
      const mockedUser = getMockedUser() as unknown as Query<
        UserDocument,
        UserDocument
      >;

      jest.spyOn(userModel, 'findOne').mockReturnValue(mockedUser);

      const user = await service.findOne('a value', undefined);
      expect(user).toEqual(mockedUser);
    });
    it('by id should return a user', async () => {
      const mockedUser = getMockedUser() as unknown as Query<
        UserDocument,
        UserDocument
      >;

      jest.spyOn(userModel, 'findOne').mockReturnValue(mockedUser);

      const user = await service.findOne(undefined, 'a value');
      expect(user).toEqual(mockedUser);
    });
  });
});
