import { configureStore } from '@reduxjs/toolkit';
import RecordSlice from '../modules/Recording/state/RecordSlice';
import { RecordState } from '../modules/Recording/state/RecordTypes';

export function CreateStore(initialState?: { record: RecordState }) {
  return configureStore({
    reducer: {
      record: RecordSlice,
    },
    preloadedState: initialState,
  });
}

const store = CreateStore();

export type AppState = ReturnType<typeof store.getState>;
export default store;
