import { createAsyncThunk } from '@reduxjs/toolkit';
import { audiodb } from '../Databases';
import { AudioEntry } from '../types';

export const saveRecordInDb = createAsyncThunk<void, Blob>(
  'db/saveRecordInDb',
  (audioData: Blob) => {
    const entry: AudioEntry = {
      date: new Date(),
      description: 'none yet',
      length: 20,
      audio: audioData,
    };
    audiodb.addEntry(entry);
  }
);
