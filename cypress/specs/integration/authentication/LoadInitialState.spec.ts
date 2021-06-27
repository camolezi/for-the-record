import { AppState } from '../../../../src/app/Store';
import { AsyncActionStatus } from '../../../../src/utils/ReduxUtils/AsyncActionHelpers';

describe('Should load correct initial state when app is started', () => {
  const name = 'simpleUsernameTest';
  const password = 'testPassword';

  it('should load user if user is created in db', () => {
    cy.visit('/');

    cy.loadInitialState();
    cy.getReduxState((state: AppState) => {
      expect(state.user.isUserCreated).to.equal(AsyncActionStatus.NotStarted);
    });

    cy.createUserInDb({ name, password });

    cy.loadInitialState();
    cy.getReduxState((state: AppState) => {
      expect(state.user.isUserCreated).to.equal(AsyncActionStatus.Completed);
      expect(state.user.name).to.equal(name);
      expect(state.user.isLoggedIn).to.equal(AsyncActionStatus.NotStarted);
    });
  });

  it('Should load user from session storage', () => {
    cy.visit('/');

    cy.loadInitialState();
    cy.getReduxState((state: AppState) => {
      expect(state.user.isLoggedIn).to.equal(AsyncActionStatus.NotStarted);
    });

    cy.createUserInSessionStorage({ name, password });

    cy.loadInitialState();
    cy.getReduxState((state: AppState) => {
      expect(state.user.isLoggedIn).to.equal(AsyncActionStatus.Completed);
      expect(state.user.isUserCreated).to.equal(AsyncActionStatus.Completed);
      expect(state.user.name).to.equal(name);
    });
  });
});
