/* eslint-disable no-unused-expressions */
/* eslint-disable cypress/no-unnecessary-waiting */

const isPlaying = (audio: HTMLAudioElement) =>
  !audio.paused && !audio.muted && audio.duration > 0;

describe('Recording Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('User is logged in', () => {
    beforeEach(() => {
      cy.createUserAndLogin();
    });

    it('Should be able to record and playback audio', () => {
      const recordingTime = 2500;
      const recordingError = 350;

      cy.findByTitle('microphone not authorized or available', {
        exact: false,
      }).should('not.exist');

      cy.findByRole('button', {
        name: /Start Recording/i,
      }).click();

      cy.findByRole('button', {
        name: /End Recording/i,
      })
        .wait(recordingTime)
        .click();

      cy.findByRole('button', {
        name: /PlayPause/i,
      }).click();

      cy.get('audio').should((elm) => {
        const audio = elm[0];

        expect(isPlaying(audio)).to.be.true;
        expect(audio.duration * 1000).to.be.within(
          // TODO FAILED IN FIREFOX - Audio duration is infinity in firefox, need to investigate
          recordingTime - recordingError,
          recordingTime + recordingError
        );
      });
    });

    it('Should have link to calendar page', () => {
      cy.findByRole('link', { name: /Calendar/i }).click();

      cy.url().should('include', '/calendar');
    });

    it('Should have link to options page', () => {
      cy.findByRole('link', { name: /Options/i }).click();

      cy.url().should('include', '/options');
    });
  });

  describe('User not logged in', () => {
    it('Should redirect to login page', () => {
      cy.url().should('include', '/login');
    });
  });
});

export default {};
