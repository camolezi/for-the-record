import { createAsyncThunk } from '@reduxjs/toolkit';
import getBlobDuration from 'get-blob-duration';
import { audiodb } from '../Databases';
import { AudioEntry } from '../types';

export const saveRecordInDb = createAsyncThunk<Date, Blob>(
  'db/saveRecordInDb',
  async (audioData: Blob) => {
    const entry: AudioEntry = {
      date: new Date(),
      description: '',
      length: await getBlobDuration(audioData),
      audio: audioData,
    };
    return audiodb.addEntry(entry);
  }
);
