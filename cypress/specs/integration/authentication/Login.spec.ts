describe('Login Module', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should be able to login if a user exists', () => {
    const password = 'testpassword';
    cy.createUser({ name: 'testUser', password });

    cy.findByLabelText('password', { exact: false }).type(password);
    cy.findByRole('button', { name: 'Submit', exact: false }).click();

    cy.findByText('Pending', { exact: false }).should('be.visible');

    // TODO - This is brittle better rethink, should not need to know property name
    cy.findByText('Successfully', { exact: false }).then(() => {
      cy.window().then((win) =>
        expect(win.sessionStorage).to.have.property('authInfo')
      );
    });
  });

  it('should not be able to login if password is incorrect', () => {
    cy.createUser();

    cy.findByLabelText('password', { exact: false }).type('wrongPassword');
    cy.findByRole('button', { name: 'Submit', exact: false }).click();

    cy.findByText('Incorrect', { exact: false }).then(() => {
      cy.window().then((win) =>
        expect(win.sessionStorage).to.not.have.property('authInfo')
      );
    });
  });

  it('should display a link to create user page if user is not created', () => {
    cy.findByLabelText('password', { exact: false }).should('not.exist');
    cy.findByRole('link', { name: /new user/i }).click();
    cy.url().should('include', '/create');
  });
});

export {};
