import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';
import { getMockedUser, mockedUserModel } from './users.mocker';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockedUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
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
