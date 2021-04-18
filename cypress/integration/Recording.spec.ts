describe('Recording Page', () => {
  it('#Should be able to record and playback audio', () => {
    const recordingTime = 2000;

    cy.visit('localhost:3000');

    // Waiting for user permission
    cy.findByTitle('Waiting microphone permission', { exact: false }).should(
      'not.exist'
    );

    // Start recording
    cy.findByRole('button', {
      name: /Start Record/i,
    }).click();

    // Stop recording after recording time
    cy.findByRole('button', {
      name: /End Record/i,
    })
      .wait(recordingTime)
      .click();

    // Start playback
    cy.findByRole('button', {
      name: /PlayPause/i,
    }).click();
  });
});

export default {};
