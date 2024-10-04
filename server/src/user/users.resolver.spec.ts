import { Test, TestingModule } from '@nestjs/testing';
import { Query } from 'mongoose';

import { UserDocument } from './entities/user.entity';
import { getMockedUser, mockedUsersService } from './users.mocker';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UsersService, useValue: mockedUsersService },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOne', () => {
    it('should call usersService.findOne with correct parameters', () => {
      const parameters = { _id: '', email: '' };
      const mockedUser = getMockedUser() as unknown as Query<
        UserDocument,
        UserDocument
      >;
      jest
        .spyOn(usersService, 'findOne')
        .mockReturnValue(mockedUser);

      const user = resolver.findOne(
        parameters._id,
        parameters.email,
      );

      expect(usersService.findOne).toHaveBeenCalledWith(
        parameters._id,
        parameters.email,
      );
      expect(user).toEqual(mockedUser);
    });
  });
});
