/* eslint-disable import/no-extraneous-dependencies */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

import '@testing-library/cypress/add-commands';
import { audiodb, userdb } from '../../src/modules/Db/Databases';

beforeEach(() => {
  return userdb.clearUser().run();
});

beforeEach(() => {
  return audiodb.clearAllEntries();
});

beforeEach(() => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});
