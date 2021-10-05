export type AudioEntryHeader = {
  date: Date;
  description: string;
  length: number;
};

export type AudioData = {
  date: Date;
  iv: Uint8Array;
  encryptedAudio: ArrayBuffer;
  mimeType: string;
};

export type AudioEntry = AudioEntryHeader & AudioData;

export interface LoginKey {
  salt: string;
  encodedKey: string;
}

export interface User {
  name: string;
  loginKey: LoginKey;
}
