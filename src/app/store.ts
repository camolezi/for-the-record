import { configureStore } from '@reduxjs/toolkit';
import RecordSlice from '../modules/Recording/RecordSlice';

export function CreateStore() {
  return configureStore({
    reducer: {
      record: RecordSlice,
    },
  });
}

const store = CreateStore();

export default store;
