import { Types } from 'mongoose';

const mockedUserModel = { findOne: jest.fn() };

const mockedUsersService = { findOne: jest.fn() };

const getMockedUser = (
  _id = new Types.ObjectId(),
  email = 'email value',
  password = 'password value',
) => ({ _id, email, password });

export { getMockedUser,mockedUserModel, mockedUsersService };
