export default {};

describe('Should be able to record and playback audio', () => {
  it('should start recording when clicked on the play button', () => {
    const recordingTime = 2000;

    cy.visit('localhost:3000');

    cy.contains('Start Record').click().wait(recordingTime);
    cy.contains('End Record').click();
  });
});
