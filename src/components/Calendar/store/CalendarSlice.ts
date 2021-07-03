/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { loadMonthRecordigns, selectedDay } from '../actions/CalendarActions';
import { CalendarState } from './CalendarTypes';

export const InitialCalendarState: CalendarState = {
  selectedDay: null,
  recordings: [],
};

const CalendarSlice = createReducer(InitialCalendarState, (builder) => {
  builder
    .addCase(loadMonthRecordigns.fulfilled, (state, action) => {
      state.recordings = action.payload;
    })
    .addCase(selectedDay.fulfilled, (state, action) => {
      state.selectedDay = action.payload;
    });
});

export default CalendarSlice;
