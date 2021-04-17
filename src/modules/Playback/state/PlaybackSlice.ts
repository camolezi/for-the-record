/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaybackState {
  audioUrl: string;
}

export const InitialPlaybackState: PlaybackState = {
  audioUrl: '',
};

const PlaybackSlice = createSlice({
  name: 'playback',
  initialState: InitialPlaybackState,
  reducers: {
    createdAudioUrl(state, action: PayloadAction<string>) {
      state.audioUrl = action.payload;
    },
  },
});

export default PlaybackSlice.reducer;

export const { createdAudioUrl } = PlaybackSlice.actions;
