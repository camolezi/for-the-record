import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../app/Store';
import { MicAvailability } from './RecordTypes';

export const selectIsRecording = (state: AppState) => state.record.isRecording;

export const selectMicrophoneAvailability = (state: AppState) =>
  state.record.isMicrophoneAvailable;

export const selectIsMicAvailable = createSelector(
  selectMicrophoneAvailability,
  (micAvailability) => micAvailability === MicAvailability.Available
);
