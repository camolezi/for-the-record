/* eslint-disable no-unused-expressions */

import { userdb } from '../../src/modules/Db/Databases';
import { User } from '../../src/modules/Db/types';

describe('Indexed db module', () => {
  before(() => {
    cy.visit('/');
  });

  describe('User database', () => {
    it('should return nothing when user is not created', () => {
      return userdb
        .getUser()
        .run()
        .then((user) => {
          expect(user.isNothing()).to.be.true;
        });
    });

    it('should create a new user', () => {
      const userFix: User = {
        name: 'TestUser',
        loginKey: { salt: 'testSalt', encodedKey: 'thisIsAKey' },
      };

      return userdb
        .createUser(userFix)
        .run()
        .then((user) => {
          expect(user.extract()).to.deep.equal(userFix);
        });
    });
  });
});

export {};
