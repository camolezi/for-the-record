import { AppState } from '../../../app/Store';

export const selectAudioUrl = (state: AppState) => state.playback.audioUrl;

export const selectIsPlaying = (state: AppState) => state.playback.isPlaying;

export const selectAudioDuration = (state: AppState) =>
  state.playback.audioDuration;
