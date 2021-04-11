import { configureStore } from '@reduxjs/toolkit';
import RecordSlice from '../modules/Recording/RecordSlice';

const CreateStore = () =>
  configureStore({
    reducer: {
      record: RecordSlice,
    },
  });

export default CreateStore;
