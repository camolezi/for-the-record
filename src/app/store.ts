import { configureStore } from '@reduxjs/toolkit';
import RecordSlice from '../modules/Recording/RecordSlice';

const store = configureStore({
  reducer: {
    record: RecordSlice,
  },
});
export default store;
