import { createAsyncThunk } from '@reduxjs/toolkit';
import authSession from '../../Authentication/AuthSession';
import { Decrypt } from '../../Crypto/Authenticate';
import { audiodb } from '../../Db/Databases';
import { AudioEntryHeader } from '../../Db/types';
import { createdAudioUrl } from '../../Playback/actions/PlaybackActions';

export const loadMonthRecordigns = createAsyncThunk<AudioEntryHeader[], Date>(
  'calendar/loadMonthRecordigns',
  async (monthDate) => {
    return audiodb.getMonthEntriesHeader(monthDate);
  }
);

export const selectedDay = createAsyncThunk(
  'calendar/selectedDay',
  (day: number) => {
    return day;
  }
);

export const loadAudioPlayback = createAsyncThunk(
  'calendar/loadAudioPlayback',
  async (date: Date, { dispatch }) => {
    // TODO - move encryption logic to separate file
    const audioData = await audiodb.getEntry(date);
    if (!audioData) return null;

    const cryptoKey = await authSession.getUserKey();
    if (!cryptoKey) return null;

    const sd = await Decrypt(
      { iv: audioData.iv, encryptedData: audioData.encryptedAudio },
      {
        key: cryptoKey,
        salt: new Uint8Array(),
      }
    )
      .run()
      .then((maybe) => maybe.extractNullable());

    if (!sd) return null;

    if (audioData)
      dispatch(
        createdAudioUrl(
          new Blob([sd], {
            type: audioData.mimeType,
          })
        )
      );

    return null;
  }
);
