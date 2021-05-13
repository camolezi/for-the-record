import {
  Encrypt,
  Decrypt,
  ValidatePassword,
} from '../../src/modules/Crypto/Authenticate';
import {
  ArrayBufferToStr,
  StrToArrayBuffer,
} from '../../src/utils/Buffer/BufferUtils';

describe('Crypto module', () => {
  before(() => {
    cy.visit('/');
  });
  describe('Encrypt/Decrypt', () => {
    it('Should Encrypt and Decrypt data using a secret', async () => {
      const plainTextFixture = 'letMyTestRunPlease';

      const EncryptedData = await Encrypt(
        StrToArrayBuffer(plainTextFixture),
        'password'
      );

      const plainTextBuffer = await Decrypt(EncryptedData, 'password');
      expect(ArrayBufferToStr(plainTextBuffer)).equal(plainTextFixture);
    });
  });

  describe('Validate Password', () => {
    it('should return true if password is able to correctly decrypt the data', async () => {
      const password = 'testPassword';

      const validationText = StrToArrayBuffer('letMyTestRunPlease');

      const encrypted = await Encrypt(validationText, password);
      const result = await ValidatePassword(
        validationText,
        encrypted,
        password
      );

      expect(result).equal(true);
    });
  });
});
