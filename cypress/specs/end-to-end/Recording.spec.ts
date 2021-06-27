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
      const recordingTime = 2000;
      const recordingError = 110;

      cy.findByTitle('Waiting microphone permission', { exact: false }).should(
        'not.exist'
      );

      cy.findByRole('button', {
        name: /Start Record/i,
      }).click();

      cy.findByRole('button', {
        name: /End Record/i,
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
  });

  describe('User not logged in', () => {
    it('Should have a link to craete user page', () => {
      cy.findByRole('button', {
        name: /Start Record/i,
      }).should('not.exist');

      cy.findByRole('link', { name: /log in/i }).click();

      cy.url().should('include', '/login');
    });
  });
});

export default {};
