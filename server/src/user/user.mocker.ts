import { Types } from 'mongoose';

const mockedUserModel = { findOne: jest.fn() };

const mockedUserService = { findOne: jest.fn() };

const getMockedUser = (
  _id = new Types.ObjectId(),
  email = 'email value',
  password = 'password value',
) => ({ _id, email, password });

export { mockedUserModel, mockedUserService, getMockedUser };
