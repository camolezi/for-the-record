import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { recordButtonClicked } from './RecordActions';

function RecordPanel(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <Button colorScheme="teal" onClick={() => dispatch(recordButtonClicked())}>
      Start Record
    </Button>
  );
}

export default RecordPanel;
