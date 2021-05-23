export interface AudioEntry {
  date: Date;
  description: string;
  length: number;
  audio: Blob;
}

export interface User {
  name: string;
  hashPassword: string;
}
