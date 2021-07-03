import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../app/Store';
import { isDateOnDay } from '../../../utils/DateTime/WeekDays';

export const selectRecording = (state: AppState) => state.calendar.recordings;

export const selectSelectedDay = (state: AppState) =>
  state.calendar.selectedDay;

export const selectMonthRecordingObject = createSelector(
  selectRecording,
  (recordings) =>
    recordings
      .map((recording) => recording.date.getDate())
      .reduce((recordingObj, day) => ({ [day]: 1, ...recordingObj }), {})
);

export const selectDayRecordingHeaders = createSelector(
  selectRecording,
  selectSelectedDay,
  (recordings, selectedDay) => {
    if (!selectedDay) return [];
    return recordings.filter((recording) =>
      isDateOnDay(recording.date, selectedDay)
    );
  }
);
