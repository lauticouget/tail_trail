import { Test, TestingModule } from '@nestjs/testing';
import { Query } from 'mongoose';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { getMockedUser, mockedUserService } from './user.mocker';
import { UserDocument } from './entities/user.entity';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: mockedUserService },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOne', () => {
    it('should call userService.findOne with correct parameters', () => {
      const parameters = { _id: '', email: '' };
      const mockedUser = getMockedUser() as unknown as Query<
        UserDocument,
        UserDocument
      >;
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(mockedUser);

      const user = resolver.findOne(
        parameters._id,
        parameters.email,
      );

      expect(userService.findOne).toHaveBeenCalledWith(
        parameters._id,
        parameters.email,
      );
      expect(user).toEqual(mockedUser);
    });
  });
});
