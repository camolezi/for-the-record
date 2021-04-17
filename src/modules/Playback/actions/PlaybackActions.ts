import { createAsyncThunk } from '@reduxjs/toolkit';
import audio from '../AudioController/AudioController';

export const startPlayingRecord = createAsyncThunk(
  'playback/startPlayingRecord',
  () => {
    audio.startPlaying();
  }
);

export const pausePlayingRecord = createAsyncThunk(
  'playback/pausePlayingRecord',
  () => {
    audio.pausePlaying();
  }
);
