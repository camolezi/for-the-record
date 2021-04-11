import React from 'react';
import { Button } from '@chakra-ui/react';
import { recordButtonClicked } from './RecordActions';
import { useTypedDispatch, useTypedSelector } from '../../app/Store';
import { selectIsRecording } from './state/RecordSelectors';

function RecordPanel(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isRecording = useTypedSelector(selectIsRecording);

  return (
    <Button colorScheme="teal" onClick={() => dispatch(recordButtonClicked())}>
      {isRecording ? 'End Record' : 'Start Record'}
    </Button>
  );
}

export default RecordPanel;
