import { createAsyncThunk } from '@reduxjs/toolkit';
import audio from '../AudioController/AudioController';

import { PlaybackState } from '../state/PlaybackTypes';

export const loadAudioDuration = createAsyncThunk(
  'playback/loadAudioDuration',
  () => {
    return audio.getAudioDuration();
  }
);

export const createdAudioUrl = createAsyncThunk(
  'playback/createdAudioUrl',
  (audioData: Blob) => {
    const audioURL = window.URL.createObjectURL(audioData);
    audio.setAudioSource(audioURL);
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
