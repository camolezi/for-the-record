/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  askForMicrophonePermission,
  recordButtonClicked,
  startRecording,
  stopRecording,
} from '../RecordActions';
import { MicAvailability, RecordState } from './RecordTypes';

export const InitialRecordState: RecordState = {
  isRecording: false,
  isMicrophoneAvailable: MicAvailability.NotAvailable,
};

const RecordSlice = createSlice({
  name: 'record',
  initialState: InitialRecordState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(askForMicrophonePermission.fulfilled, (state) => {
        state.isMicrophoneAvailable = MicAvailability.Available;
      })
      .addCase(askForMicrophonePermission.rejected, (state) => {
        state.isMicrophoneAvailable = MicAvailability.NotAvailable;
      })
      .addCase(askForMicrophonePermission.pending, (state) => {
        state.isMicrophoneAvailable = MicAvailability.Pending;
      })
      .addCase(startRecording.fulfilled, (state) => {
        state.isRecording = true;
      })
      .addCase(stopRecording.fulfilled, (state) => {
        state.isRecording = false;
      }),
});

export default RecordSlice.reducer;
