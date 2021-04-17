/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  pausePlayingRecord,
  startPlayingRecord,
} from '../actions/PlaybackActions';

interface PlaybackState {
  audioUrl: string;
  isPlaying: boolean;
}

export const InitialPlaybackState: PlaybackState = {
  audioUrl: '',
  isPlaying: false,
};

const PlaybackSlice = createSlice({
  name: 'playback',
  initialState: InitialPlaybackState,
  reducers: {
    createdAudioUrl(state, action: PayloadAction<string>) {
      state.audioUrl = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(startPlayingRecord.fulfilled, (state) => {
        state.isPlaying = true;
      })
      .addCase(pausePlayingRecord.fulfilled, (state) => {
        state.isPlaying = false;
      }),
});

export default PlaybackSlice.reducer;

export const { createdAudioUrl } = PlaybackSlice.actions;
