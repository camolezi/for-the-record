import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import audio from '../AudioController/AudioController';

export const createdAudioUrl = createAction<string>('playback/createdAudioUrl');

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

export const pausePlayButtonClicked = createAsyncThunk(
  'playback/pausePlayButtonClicked',
  (_, { dispatch, getState }) => {
    const {
      playback: { isPlaying },
    } = getState() as any;

    if (isPlaying) dispatch(pausePlayingRecord());
    else dispatch(startPlayingRecord());
  }
);
