import { createAsyncThunk } from '@reduxjs/toolkit';
import audio from '../AudioController/AudioController';
import { PlaybackState } from '../state/PlaybackTypes';

export const createdAudioUrl = createAsyncThunk(
  'playback/createdAudioUrl',
  (audioData: Blob) => {
    const audioURL = window.URL.createObjectURL(audioData);
    return audioURL;
  }
);

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
      playback: { isPlaying, audioUrl },
    } = getState() as { playback: PlaybackState };

    if (audioUrl)
      if (isPlaying) dispatch(pausePlayingRecord());
      else dispatch(startPlayingRecord());
  }
);
