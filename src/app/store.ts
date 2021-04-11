import { configureStore } from '@reduxjs/toolkit';
import RecordSlice, { RecordState } from '../modules/Recording/RecordSlice';

export function CreateStore(initialState?: { record: RecordState }) {
  return configureStore({
    reducer: {
      record: RecordSlice,
    },
    preloadedState: initialState,
  });
}

const store = CreateStore();

export default store;
