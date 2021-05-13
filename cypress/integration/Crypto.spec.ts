import { Encrypt, Decrypt } from '../../src/modules/Crypto/Authenticate';

describe('Crypto module', () => {
  before(() => {
    cy.visit('/');
  });
  describe('Encrypt/Decrypt', () => {
    it('Should Encrypt and Decrypt data using a secret', () => {
      const plainTextFixture = 'letMyTestRunPlease';
      const encoder = new TextEncoder();

      Encrypt(encoder.encode(plainTextFixture), 'password').then(
        (EncryptedData) =>
          Decrypt(EncryptedData, 'password').then((plainTextBuffer) => {
            const decoder = new TextDecoder();
            expect(decoder.decode(plainTextBuffer)).eq(plainTextFixture);
          })
      );
    });
  });
});
