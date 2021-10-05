import { createAsyncThunk } from '@reduxjs/toolkit';
import getBlobDuration from 'get-blob-duration';

import authSession from '../../Authentication/AuthSession';
import { Encrypt } from '../../Crypto/Authenticate';
import { audiodb } from '../Databases';
import { AudioEntry } from '../types';

export const saveRecordInDb = createAsyncThunk<Date | null, Blob>(
  'db/saveRecordInDb',
  async (audioData: Blob) => {
    // TODO - move encryption logic to separate file
    const cryptoKey = await authSession.getUserKey();
    if (!cryptoKey) return null;

    const audioBuffer = await audioData.arrayBuffer();

    const encryptionResult = await Encrypt(audioBuffer, {
      key: cryptoKey,
      salt: new Uint8Array(),
    })
      .run()
      .then((maybe) => maybe.extractNullable());

    if (!encryptionResult) return null;

    const entry: AudioEntry = {
      date: new Date(),
      description: '',
      length: await getBlobDuration(audioData),
      encryptedAudio: encryptionResult.encryptedData,
      mimeType: audioData.type,
      iv: encryptionResult.iv,
    };

    return audiodb.addEntry(entry);
  }
);
