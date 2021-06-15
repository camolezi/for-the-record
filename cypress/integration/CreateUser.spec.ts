/* eslint-disable no-unused-expressions */

import { userdb } from '../../src/modules/Db/Databases';

describe('Create User Module', () => {
  describe('Create user page', () => {
    // eslint-disable-next-line cypress/no-async-tests
    it('Should have correct inputs', () => {
      cy.visit('/create');

      const userName = 'TestUser';

      cy.findByLabelText('Your Name', { exact: false })
        .should('be.enabled')
        .type(userName);
      cy.findAllByLabelText('Password', { exact: false })
        .first()
        .type('SomePassword');

      cy.findByLabelText('Confirm password', { exact: false })
        .type('SomePassword')
        .type('{enter}');

      // temporary wait - remove when page is done
      cy.wait(4000).then(() => {
        userdb
          .getUser()
          .run()
          .then((user) => {
            expect(user.extract()).to.have.property('name', userName);
          });
      });
    });
  });
});
