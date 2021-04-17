import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import PlaybackSlice, {
  InitialPlaybackState,
} from '../modules/Playback/state/PlaybackSlice';
import RecordSlice, {
  InitialRecordState,
} from '../modules/Recording/state/RecordSlice';

const rootReducer = combineReducers({
  record: RecordSlice,
  playback: PlaybackSlice,
});

export type AppState = ReturnType<typeof rootReducer>;

const AppInitialState: AppState = {
  record: InitialRecordState,
  playback: InitialPlaybackState,
};

export function CreateStore(partialState?: Partial<AppState>) {
  const appInitialState = {
    ...AppInitialState,
    ...partialState,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: appInitialState,
  });
}

const store = CreateStore();
export default store;

export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
