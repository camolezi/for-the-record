/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  createdAudioUrl,
  pausePlayingRecord,
  startPlayingRecord,
} from '../actions/PlaybackActions';
import { PlaybackState } from './PlaybackTypes';

export const InitialPlaybackState: PlaybackState = {
  audioUrl: '',
  isPlaying: false,
};

const PlaybackSlice = createReducer(InitialPlaybackState, (builder) =>
  builder
    .addCase(createdAudioUrl, (state, action) => {
      state.audioUrl = action.payload;
    })
    .addCase(startPlayingRecord.fulfilled, (state) => {
      state.isPlaying = true;
    })
    .addCase(pausePlayingRecord.fulfilled, (state) => {
      state.isPlaying = false;
    })
);

export default PlaybackSlice;
