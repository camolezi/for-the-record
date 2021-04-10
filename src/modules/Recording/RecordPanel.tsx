import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { askForMicrophonePermission } from './RecordSlice';

function RecordPanel(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Button
      colorScheme="teal"
      onClick={() => dispatch(askForMicrophonePermission())}
    >
      Start Record
    </Button>
  );
}

export default RecordPanel;
