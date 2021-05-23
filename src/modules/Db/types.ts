export interface AudioEntry {
  date: Date;
  description: string;
  length: number;
  audio: Blob;
}

export interface LoginKey {
  salt: string;
  encodedKey: string;
}

export interface User {
  name: string;
  loginKey: LoginKey;
}
