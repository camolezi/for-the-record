import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import RecordSlice from '../modules/Recording/state/RecordSlice';

const rootReducer = combineReducers({ record: RecordSlice });

export type AppState = ReturnType<typeof rootReducer>;

export function CreateStore(initialState?: AppState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}

const store = CreateStore();
export default store;

export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
