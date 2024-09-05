import { ID } from '@nestjs/graphql';

import { User } from '../user/entities/user.entity';
import {
  GraphQLTypesFactory,
  ModelTypesFactory,
} from './types.factory';

describe('Types Factory', () => {
  describe('GraphQLTypes', () => {
    describe('ID', () => {
      it('should return a GraphQL ID type', () => {
        const returnValue = GraphQLTypesFactory.ID();
        expect(returnValue).toBe(ID);
      });
    });
  });
  describe('ModelTypes', () => {
    describe('User', () => {
      it('should return a User type', () => {
        const returnValue = ModelTypesFactory.User();
        expect(returnValue).toBe(User);
      });
    });
  });
});
