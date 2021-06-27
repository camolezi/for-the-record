/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable {
    createUser(userCredentials?: { name: string; password: string }): void;
  }
}

Cypress.Commands.add(
  'createUser',
  (
    userInfo = {
      name: 'TestUser',
      password: 'TestPassword',
    }
  ) => {
    cy.window().then(async (win) => {
      const winUntyped = win as any;
      await winUntyped.store.dispatch(winUntyped.createNewUser(userInfo));
    });
  }
);

// cy.window().then(async (win: any) => {
//   await win.store.dispatch(win.loginUser(password));
// });
