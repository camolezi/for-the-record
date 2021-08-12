import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../app/Store';

export const selectAudioUrl = (state: AppState) => state.playback.audioUrl;

export const selectIsPlaying = (state: AppState) => state.playback.isPlaying;

export const selectAudioDuration = (state: AppState) =>
  state.playback.audioDuration;

export const selectCurrentAudioTime = (state: AppState) =>
  state.playback.currentAudioTime;

export const selectCurrentAudioCompletedPercentage = createSelector(
  selectCurrentAudioTime,
  selectAudioDuration,
  (currentTime, audioDuration) => (currentTime / audioDuration) * 100
);
