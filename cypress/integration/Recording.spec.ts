export default {};

describe('Should be able to record and playback audio', () => {
  it('should start recording when clicked on the play button', () => {
    const recordingTime = 2000;

    cy.visit('localhost:3000');

    // First click in record button should ask for permission
    cy.findByRole('button', {
      name: /Start Record/i,
    })
      .as('StartRecordButton')
      .click()
      .findByTitle('Waiting microphone permission', { exact: false })
      .should('not.exist');

    // Start recording
    cy.get('@StartRecordButton').click().wait(recordingTime);

    cy.findByRole('button', {
      name: /End Record/i,
    }).click();

    // Start playback
    cy.findByRole('button', {
      name: /PlayPause/i,
    }).click();
  });
});
