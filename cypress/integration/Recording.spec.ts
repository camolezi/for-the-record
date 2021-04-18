export default {};

describe('Should be able to record and playback audio', () => {
  it('should start recording when clicked on the play button', () => {
    const recordingTime = 2000;

    cy.visit('localhost:3000');

    // First click ask for permission, second start recording
    cy.findByRole('button', {
      name: /Start Record/i,
    })
      .click()
      .findByTitle('Waiting microphone permission', { exact: false })
      .should('not.be.visible');

    cy.findByRole('button', {
      name: /End Record/i,
    })
      .click()
      .wait(recordingTime);

    cy.findByRole('button', {
      name: /PlayPause/i,
    }).click();
  });
});
