import { AppState } from '../../../app/Store';

export const selectIsRecording = (state: AppState) => state.record.isRecording;
