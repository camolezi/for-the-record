/* eslint-disable no-unused-expressions */
import { Just } from 'purify-ts/Maybe';
import {
  Encrypt,
  Decrypt,
  GenerateKeyParam,
} from '../../src/modules/Crypto/Authenticate';
import {
  ArrayBufferToStr,
  StrToArrayBuffer,
} from '../../src/utils/Buffer/BufferUtils';

/*
  Crypto api is not current available in firefox cypress 
  https://github.com/cypress-io/cypress/issues/14600
*/

describe('Crypto module', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Encrypt/Decrypt', () => {
    it('Should Encrypt and Decrypt data using a secret', async () => {
      const plainTextFixture = 'letMyTestRunPlease';
      const password = GenerateKeyParam('testpassword');

      return Encrypt(StrToArrayBuffer(plainTextFixture), password)
        .chain((encryptData) => Decrypt(encryptData, password))
        .run()
        .then((plainText) => {
          const isEqual = plainText
            .map(ArrayBufferToStr)
            .equals(Just(plainTextFixture));

          expect(isEqual).to.be.true;
        });
    });

    it('Should not Decrypt data using a different secret', async () => {
      const plainTextFixture = 'letMyTestRunPlease';
      const password = GenerateKeyParam('testpassword');

      return Encrypt(StrToArrayBuffer(plainTextFixture), password)
        .ifJust(() => {
          password.secret = 'differentSecret';
        })
        .chain((encryptData) => Decrypt(encryptData, password))
        .run()
        .then((plainText) => {
          expect(plainText.isNothing()).to.be.true;
        });
    });
  });
});
