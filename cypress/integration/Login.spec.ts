describe('Login Module', () => {
  describe('Create user page', () => {
    it('should be able to login if a user exists', () => {
      cy.visit('/login');

      const password = 'testpassword';
      cy.createUser({ name: 'testUser', password });

      cy.findByLabelText('password', { exact: false }).type(password);
      cy.findByRole('button', { name: 'Submit', exact: false }).click();

      // TODO - This is brittle better rethink, should not need to know property name
      cy.findByText('Successfully', { exact: false }).then(() => {
        cy.window().then((win) =>
          expect(win.sessionStorage).to.have.property('authInfo')
        );
      });
    });
  });

  describe('Login page', () => {
    it('should not be able to login if a user dont exists', () => {
      cy.visit('/login');

      cy.findByLabelText('password', { exact: false }).type('wrongPassword');
      cy.findByRole('button', { name: 'Submit', exact: false }).click();

      cy.findByText('Incorrect', { exact: false }).then(() => {
        cy.window().then((win) =>
          expect(win.sessionStorage).to.not.have.property('authInfo')
        );
      });
    });
  });
});

export {};
