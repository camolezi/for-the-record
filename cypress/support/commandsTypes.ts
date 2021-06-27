/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

type UserCredentials = { name: string; password: string };

declare namespace Cypress {
  interface Chainable {
    createUser(userCredentials?: UserCredentials): void;
    login(password: string): void;
    createUserAndLogin(userCredentials?: UserCredentials): void;
    createUserInDb(userCredentials?: UserCredentials): void;
    loadInitialState(): void;
    getReduxState(func: (state: any) => void): void;
    createUserInSessionStorage(userCredentials?: UserCredentials): void;
  }
}
