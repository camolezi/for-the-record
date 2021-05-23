import argon2 from 'argon2-browser';
import { MaybeAsync } from 'purify-ts/MaybeAsync';
import { ArrayBufferToStr } from '../../utils/Buffer/BufferUtils';
import { CryptoKeyToBuffer, GenerateSalt } from './Authenticate';

export interface Argon2BrowserHashResult {
  encoded: string;
  hash: Uint8Array;
  hashHex: string;
}

export function HashKeyToStorage(
  key: CryptoKey
): MaybeAsync<Argon2BrowserHashResult> {
  const salt = GenerateSalt(16);
  return CryptoKeyToBuffer(key)
    .map(ArrayBufferToStr)
    .chain((keydata) => argon2Hash(keydata, salt));
}

export function VerifyHash(
  key: CryptoKey | string,
  encodedKey: string
): MaybeAsync<void> {
  if (typeof key === 'string') return argon2Verify(key, encodedKey);

  return CryptoKeyToBuffer(key)
    .map(ArrayBufferToStr)
    .chain((keyStr) => argon2Verify(keyStr, encodedKey));
}

function argon2Verify(password: string, encodedKey: string) {
  return MaybeAsync(() =>
    argon2.verify({
      pass: password,
      encoded: encodedKey,
      type: argon2.ArgonType.Argon2id,
    })
  );
}

function argon2Hash(keyData: string, salt: Uint8Array) {
  return MaybeAsync(() =>
    argon2.hash({
      pass: keyData,
      salt,
      type: argon2.ArgonType.Argon2id,
    })
  );
}
