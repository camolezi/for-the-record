/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  changedAudioTime,
  createdAudioUrl,
  loadAudioDuration,
  pausePlayingRecord,
  startPlayingRecord,
  stopPlayingRecord,
} from '../actions/PlaybackActions';
import { PlaybackState } from './PlaybackTypes';

export const InitialPlaybackState: PlaybackState = {
  audioUrl: '',
  isPlaying: false,
  audioDuration: 0,
  currentAudioTime: 0,
};

const PlaybackSlice = createReducer(InitialPlaybackState, (builder) =>
  builder
    .addCase(createdAudioUrl.fulfilled, (state, action) => {
      state.audioUrl = action.payload;
    })
    .addCase(startPlayingRecord.fulfilled, (state) => {
      state.isPlaying = true;
    })
    .addCase(pausePlayingRecord.fulfilled, (state) => {
      state.isPlaying = false;
    })
    .addCase(stopPlayingRecord.fulfilled, (state) => {
      state.isPlaying = false;
    })
    .addCase(loadAudioDuration.fulfilled, (state, action) => {
      state.audioDuration = action.payload;
    })
    .addCase(changedAudioTime, (state, action) => {
      state.currentAudioTime = action.payload;
    })
);

export default PlaybackSlice;
