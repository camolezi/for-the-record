import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { recordButtonClicked } from './RecordActions';
import { AppState } from '../../app/store';

const selectIsRecording = (state: AppState) => state.record.isRecording;

function RecordPanel(): JSX.Element {
  const dispatch = useDispatch();
  const isRecording = useSelector(selectIsRecording);

  return (
    <Button colorScheme="teal" onClick={() => dispatch(recordButtonClicked())}>
      {isRecording ? 'End Record' : 'Start Record'}
    </Button>
  );
}

export default RecordPanel;
