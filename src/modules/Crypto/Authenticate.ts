import { curry } from 'purify-ts/Function';
import { MaybeAsync } from 'purify-ts/MaybeAsync';

export interface EncryptResult {
  algorithm: string;
  iv: Uint8Array;
  encryptedData: ArrayBuffer;
}

export interface KeyParameters {
  secret: string;
  salt: Uint8Array;
}

export function Decrypt(
  crypto: EncryptResult,
  keyParam: KeyParameters
): MaybeAsync<ArrayBuffer> {
  const decryptData = curry(decryptUsingKey);
  const generateKeyFromSecret = curry(generateKeyFromMaterial);

  return createKeyMaterial(keyParam.secret)
    .chain(generateKeyFromSecret(keyParam.salt))
    .chain(decryptData(crypto.encryptedData, crypto.iv));
}

export function Encrypt(
  data: ArrayBuffer,
  keyParam: KeyParameters
): MaybeAsync<EncryptResult> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptData = curry(encryptUsingKey);
  const generateKeyFromSecret = curry(generateKeyFromMaterial);

  return createKeyMaterial(keyParam.secret)
    .chain(generateKeyFromSecret(keyParam.salt))
    .chain(encryptData(data, iv))
    .map((encryptedData) => ({ algorithm: 'AES-GCM', iv, encryptedData }));
}

export function CreateRandomKey(): MaybeAsync<CryptoKey> {
  return MaybeAsync(() =>
    window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      false,
      ['encrypt', 'decrypt']
    )
  );
}

export function GenerateKeyParam(secret: string): KeyParameters {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  return {
    salt,
    secret,
  };
}

function encryptUsingKey(
  data: ArrayBuffer,
  iv: Uint8Array,
  key: CryptoKey
): MaybeAsync<ArrayBuffer> {
  return MaybeAsync(() =>
    window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    )
  );
}

function decryptUsingKey(
  data: ArrayBuffer,
  iv: Uint8Array,
  key: CryptoKey
): MaybeAsync<ArrayBuffer> {
  return MaybeAsync(() =>
    window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
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

function generateKeyFromMaterial(
  salt: Uint8Array,
  material: CryptoKey
): MaybeAsync<CryptoKey> {
  return MaybeAsync(() =>
    window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
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
