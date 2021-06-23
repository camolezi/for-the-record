/* eslint-disable no-unused-expressions */

import { userdb } from '../../src/modules/Db/Databases';

describe('Create User Module', () => {
  describe('Create user page', () => {
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

      cy.findByText('Pending', { exact: false }).should('be.visible');

      cy.findByText('Successfully Created', { exact: false }).then(() => {
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
