import { curry } from 'purify-ts';
import { MaybeAsync } from 'purify-ts/MaybeAsync';
// import { isBuffersEql } from '../../utils/Buffer/BufferUtils';

const testSalt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
const testIV = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function Decrypt(
  data: ArrayBuffer,
  secret: string
): MaybeAsync<ArrayBuffer> {
  const decryptData = curry(decryptUsingKey);

  return createKeyMaterial(secret)
    .chain(createKeyFromMaterial)
    .chain(decryptData(data));
}

export function Encrypt(
  data: ArrayBuffer,
  secret: string
): MaybeAsync<ArrayBuffer> {
  const encryptData = curry(encryptUsingKey);

  return createKeyMaterial(secret)
    .chain(createKeyFromMaterial)
    .chain(encryptData(data));
}

function encryptUsingKey(
  data: ArrayBuffer,
  key: CryptoKey
): MaybeAsync<ArrayBuffer> {
  return MaybeAsync(() =>
    window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(testIV),
      },
      key,
      data
    )
  );
}

function decryptUsingKey(
  data: ArrayBuffer,
  key: CryptoKey
): MaybeAsync<ArrayBuffer> {
  return MaybeAsync(() =>
    window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(testIV),
      },
      key,
      data
    )
  );
}

function createKeyMaterial(secret: string): MaybeAsync<CryptoKey> {
  return MaybeAsync(() => {
    const encoder = new TextEncoder();

    return window.crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      'PBKDF2',
      false,
      ['deriveKey']
    );
  });
}

function createKeyFromMaterial(material: CryptoKey): MaybeAsync<CryptoKey> {
  return MaybeAsync(() =>
    window.crypto.subtle.deriveKey(
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
    )
  );
}
