import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { createdAudioUrl } from '../Playback/actions/PlaybackActions';

import microphone from './Microphone/Microphone';
import { MicAvailability, RecordState } from './state/RecordTypes';

export const askForMicrophonePermission = createAsyncThunk(
  'record/askForMicrophonePermission',
  async () => {
    await microphone.askForUserPermission();
  }
);

export const startRecording = createAsyncThunk(
  'record/startRecording',
  async () => {
    microphone.startRecording();
  }
);

export const stopRecording = createAsyncThunk(
  'record/stopRecording',
  async (_, { dispatch }) => {
    const audioData = await microphone.stopRecording();

    if (audioData) {
      const audioURL = window.URL.createObjectURL(audioData);
      dispatch(createdAudioUrl(audioURL));
    }
  }
);

export const recordButtonClicked = createAsyncThunk(
  'record/recordButtonClicked',
  async (_, { dispatch, getState }) => {
    const {
      record: { isMicrophoneAvailable, isRecording },
    } = getState() as { record: RecordState };

    const nextState = calculateNextRecordAction(
      isMicrophoneAvailable,
      isRecording
    );

    if (nextState) dispatch(nextState());
  }
);

export function calculateNextRecordAction(
  isMicrophoneAvailable: MicAvailability,
  isRecording: boolean
): AsyncThunk<void, void, {}> | null {
  if (isRecording) return stopRecording;

  if (isMicrophoneAvailable === MicAvailability.NotAvailable) {
    return askForMicrophonePermission;
  }

  if (isMicrophoneAvailable === MicAvailability.Available) {
    return startRecording;
  }

  return null;
}
