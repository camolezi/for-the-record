/* eslint-disable no-unused-expressions */
import { userdb } from '../../src/modules/Db/Databases';

describe('Indexed db module', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    return userdb.clearUser().run();
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
      const userFix = {
        name: 'TestUser',
        hashPassword: 'thisIsAPassword',
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
