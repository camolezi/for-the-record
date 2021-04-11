/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  askForMicrophonePermission,
  recordButtonClicked,
} from '../RecordActions';
import { RecordState } from './RecordTypes';

export const InitialRecordState: RecordState = {
  isRecording: false,
  isMicrophoneAvailable: 'not-available',
};

const RecordSlice = createSlice({
  name: 'record',
  initialState: InitialRecordState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(askForMicrophonePermission.fulfilled, (state) => {
        state.isMicrophoneAvailable = 'available';
      })
      .addCase(askForMicrophonePermission.rejected, (state) => {
        state.isMicrophoneAvailable = 'not-available';
      })
      .addCase(askForMicrophonePermission.pending, (state) => {
        state.isMicrophoneAvailable = 'pending';
      })
      .addCase(recordButtonClicked.fulfilled, (state, action) => {
        state.isRecording = action.payload;
      }),
});

export default RecordSlice.reducer;
