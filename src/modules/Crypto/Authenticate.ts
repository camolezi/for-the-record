import { curry } from 'purify-ts/Function';
import { MaybeAsync } from 'purify-ts/MaybeAsync';

export interface EncryptResult {
  iv: Uint8Array;
  encryptedData: ArrayBuffer;
}

export interface Secret {
  secret: string;
  salt: Uint8Array;
}

export interface KeyParameters {
  key: CryptoKey;
  salt: Uint8Array;
}

export function Decrypt(
  crypto: EncryptResult,
  keyParam: KeyParameters
): MaybeAsync<ArrayBuffer> {
  return decryptUsingKey(crypto.encryptedData, crypto.iv, keyParam.key);
}

export function Encrypt(
  data: ArrayBuffer,
  keyParam: KeyParameters // TODO - Rethink Key parameters as input
): MaybeAsync<EncryptResult> {
  const iv = GenerateSalt(12);

  return encryptUsingKey(data, iv, keyParam.key).map((encryptedData) => ({
    iv,
    encryptedData,
  }));
}

export function CreateRandomKey(): MaybeAsync<CryptoKey> {
  return MaybeAsync(() =>
    window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    )
  );
}

export function CryptoKeyToBuffer(key: CryptoKey): MaybeAsync<ArrayBuffer> {
  return MaybeAsync(() => window.crypto.subtle.exportKey('raw', key));
}

export function SerializeCryptoKey(key: CryptoKey): MaybeAsync<string> {
  return MaybeAsync(() => window.crypto.subtle.exportKey('jwk', key)).map(
    JSON.stringify
  );
}

export function DeserializeCryptoKey(key: string): MaybeAsync<CryptoKey> {
  return MaybeAsync(() =>
    window.crypto.subtle.importKey('jwk', JSON.parse(key), 'AES-GCM', true, [
      'encrypt',
      'decrypt',
    ])
  );
}

export function GenerateKeyFromSecret(
  secretParam: Secret
): MaybeAsync<KeyParameters> {
  const generateKeyFromSecret = curry(generateKeyFromMaterial);

  return createKeyMaterial(secretParam.secret)
    .chain(generateKeyFromSecret(secretParam.salt))
    .map((key) => ({ key, salt: secretParam.salt }));
}

export function GenerateSaltForSecret(secret: string): Secret {
  const salt = GenerateSalt(16);
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
      true,
      ['encrypt', 'decrypt']
    )
  );
}

export function GenerateSalt(bytes: number): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(bytes));
}
