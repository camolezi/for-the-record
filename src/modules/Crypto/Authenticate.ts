import _ from 'lodash';
import { ArrayBufferToStr, isBuffersEql } from '../../utils/Buffer/BufferUtils';

const testSalt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
const testIV = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export async function ValidatePassword(
  plainText: ArrayBuffer,
  ciphertext: ArrayBuffer,
  secret: string
): Promise<boolean> {
  const descryptPlainText = await Decrypt(ciphertext, secret);

  console.log(
    'password',
    ArrayBufferToStr(descryptPlainText),
    ArrayBufferToStr(plainText)
  );

  return isBuffersEql(plainText, descryptPlainText);
}

export async function Decrypt(
  data: ArrayBuffer,
  secret: string
): Promise<ArrayBuffer> {
  const key = await createKeyMaterial(secret).then(createKeyFromMaterial);

  // Operation fail exception, should handle a return here, maybe create custom data type
  return window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(testIV),
    },
    key,
    data
  );
}

export async function Encrypt(
  data: ArrayBuffer,
  secret: string
): Promise<ArrayBuffer> {
  const encryptData = _.curry(encryptUsingKey);

  return createKeyMaterial(secret)
    .then(createKeyFromMaterial)
    .then(encryptData(data));
}

function encryptUsingKey(
  data: ArrayBuffer,
  key: CryptoKey
): Promise<ArrayBuffer> {
  return window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(testIV),
    },
    key,
    data
  );
}

function createKeyMaterial(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  return window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    'PBKDF2',
    false,
    ['deriveKey']
  );
}

function createKeyFromMaterial(material: CryptoKey): Promise<CryptoKey> {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(testSalt), // window.crypto.getRandomValues(new Uint8Array(16)),
      iterations: 100000,
      hash: 'SHA-256',
    },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}
