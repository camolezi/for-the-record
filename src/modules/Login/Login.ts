import { MaybeAsync } from 'purify-ts/MaybeAsync';
import {
  ArrayBufferToStr,
  StrToUint8Array,
} from '../../utils/Buffer/BufferUtils';
import {
  GenerateKeyFromSecret,
  GenerateSaltForSecret,
  KeyParameters,
  Secret,
} from '../Crypto/Authenticate';
import {
  Argon2BrowserHashResult,
  HashKeyToStorage,
  VerifyHash,
} from '../Crypto/HashStorage';

import { LoginKey, User } from '../Db/types';

export function AuthenticateUser(
  { loginKey: { salt, encodedKey } }: User,
  password: string
): MaybeAsync<void> {
  const secret: Secret = {
    salt: StrToUint8Array(salt),
    secret: password,
  };

  return GenerateKeyFromSecret(secret).chain((keyParam) =>
    VerifyHash(keyParam.key, encodedKey)
  );
}

export function CreateNewUser(
  name: string,
  password: string
): MaybeAsync<User> {
  const secret = GenerateSaltForSecret(password);

  return GenerateKeyFromSecret(secret)
    .chain(hashKey)
    .map((loginKey) => createUser(name, loginKey));
}

function createUser(name: string, loginKey: LoginKey): User {
  return { name, loginKey };
}

function hashKey(keyParam: KeyParameters): MaybeAsync<LoginKey> {
  const salt = ArrayBufferToStr(keyParam.salt);
  const hashedKey = HashKeyToStorage(keyParam.key);

  return buildLoginKey(salt, hashedKey);
}

function buildLoginKey(
  salt: string,
  encodedKey: MaybeAsync<Argon2BrowserHashResult>
): MaybeAsync<LoginKey> {
  return encodedKey.map((result) => ({
    encodedKey: result.encoded,
    salt,
  }));
}
