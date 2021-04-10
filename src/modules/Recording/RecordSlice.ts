/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const askForMicrophonePermission = createAsyncThunk(
  'record/askForMicrophonePermission',
  async () => {
    return navigator.mediaDevices.getUserMedia({ audio: true });
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
    builder.addCase(askForMicrophonePermission.fulfilled, (state) => {
      state.isMicrophoneAvailable = true;
    }),
});

export default RecordSlice.reducer;
