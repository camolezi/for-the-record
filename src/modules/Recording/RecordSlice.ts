/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const askForMicrophonePermission = createAsyncThunk(
  'record/askForMicrophonePermission',
  async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  }
);

export const startRecordingClicked = createAsyncThunk(
  'record/startRecordingClicked',
  async (_, { dispatch, getState }) => {
    const {
      record: { isMicrophoneAvailable },
    } = getState() as { record: RecordState };

    if (!isMicrophoneAvailable) {
      dispatch(askForMicrophonePermission());
    }
  }
);

export interface RecordState {
  isRecording: boolean;
  isMicrophoneAvailable: boolean;
}

const InitialRecordState: RecordState = {
  isRecording: false,
  isMicrophoneAvailable: false,
};

const RecordSlice = createSlice({
  name: 'record',
  initialState: InitialRecordState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(askForMicrophonePermission.fulfilled, (state) => {
        state.isMicrophoneAvailable = true;
      })
      .addCase(askForMicrophonePermission.rejected, (state) => {
        state.isMicrophoneAvailable = false;
      }),
});

export default RecordSlice.reducer;
