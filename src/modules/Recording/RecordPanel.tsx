import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { MdMicOff } from 'react-icons/md';
import { recordButtonClicked } from './RecordActions';
import { useTypedDispatch, useTypedSelector } from '../../app/Store';
import { selectIsRecording } from './state/RecordSelectors';

function RecordPanel(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isRecording = useTypedSelector(selectIsRecording);

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => dispatch(recordButtonClicked())}
      >
        {isRecording ? 'End Record' : 'Start Record'}
      </Button>
      <Icon
        title="Waiting microphone permission"
        aria-label="Mic Permission"
        as={MdMicOff}
      />
    </>
  );
}

export default RecordPanel;
