import { createAsyncThunk } from '@reduxjs/toolkit';
import microphone from './Microphone';
import { RecordState } from './state/RecordTypes';

export const askForMicrophonePermission = createAsyncThunk(
  'record/askForMicrophonePermission',
  async () => {
    await microphone.askForUserPermission();
  }
);

export const recordButtonClicked = createAsyncThunk(
  'record/recordButtonClicked',
  async (_, { dispatch, getState }) => {
    const {
      record: { isMicrophoneAvailable, isRecording },
    } = getState() as { record: RecordState };

    if (isMicrophoneAvailable === 'not-available') {
      dispatch(askForMicrophonePermission());
      return false;
    }

    if (isMicrophoneAvailable === 'available') {
      if (isRecording) {
        microphone.stopRecording();
        return false;
      }
      microphone.startRecording();
      return true;
    }

    return false;
  }
);
