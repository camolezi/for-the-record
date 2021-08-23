import { combineReducers, configureStore, isPlain } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import CalendarSlice, {
  InitialCalendarState,
} from '../modules/Calendar/store/CalendarSlice';
import UserSlice, {
  InitialUserState,
} from '../modules/Authentication/state/UserSlice';
import PlaybackSlice, {
  InitialPlaybackState,
} from '../modules/Playback/state/PlaybackSlice';
import RecordSlice, {
  InitialRecordState,
} from '../modules/Recording/state/RecordSlice';
import { AddToCypressWindow } from '../utils/testing/CypressUtils';

const rootReducer = combineReducers({
  record: RecordSlice,
  playback: PlaybackSlice,
  user: UserSlice,
  calendar: CalendarSlice,
});

export type AppState = ReturnType<typeof rootReducer>;

const AppInitialState: AppState = {
  calendar: InitialCalendarState,
  record: InitialRecordState,
  playback: InitialPlaybackState,
  user: InitialUserState,
};

const isSerializable = (value: any) => value instanceof Date || isPlain(value);

export function CreateStore(partialState?: Partial<AppState>) {
  const appInitialState = {
    ...AppInitialState,
    ...partialState,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: appInitialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          isSerializable,
        },
      }),
  });
}

const store = CreateStore();
export default store;

export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

// Dispatch actions from cypress
AddToCypressWindow('store', store);
