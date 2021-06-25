/* eslint-disable no-unused-expressions */

import { userdb } from '../../../src/modules/Db/Databases';

describe('Create User Module', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  describe('Should have correct form rules', () => {
    const passwordNotEqualErrorText = 'Passwords are different';

    it('should display error if passwords are not equal', () => {
      cy.findAllByLabelText('Password', {
        exact: false,
      })
        .first()
        .type('secretPassword');

      cy.findByLabelText('Confirm Password', {
        exact: false,
      }).type('differentPassword');

      cy.findByText(passwordNotEqualErrorText).should('be.visible');
    });

    it('should not diplay error if passwords are equal', () => {
      cy.findByLabelText('Confirm Password', {
        exact: false,
      }).type('secretPassword');

      cy.findAllByLabelText('Password', {
        exact: false,
      })
        .first()
        .type('secretPassword');

      cy.findByText(passwordNotEqualErrorText).should('not.exist');
    });
  });

  describe('Create user page', () => {
    it('Should be able to create a user successfully', () => {
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
