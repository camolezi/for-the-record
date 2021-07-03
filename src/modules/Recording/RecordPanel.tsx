import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { MdMicOff } from 'react-icons/md';

import { recordButtonClicked } from './RecordActions';
import { useTypedDispatch, useTypedSelector } from '../../app/Store';
import {
  selectIsMicAvailable,
  selectIsRecording,
} from './state/RecordSelectors';

function RecordPanel(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isRecording = useTypedSelector(selectIsRecording);
  const isMicAvailable = useTypedSelector(selectIsMicAvailable);

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => dispatch(recordButtonClicked())}
      >
        {isRecording ? 'End Record' : 'Start Record'}

        {!isMicAvailable && (
          <Icon
            title="Waiting microphone permission"
            aria-label="Mic Permission"
            as={MdMicOff}
          />
        )}
      </Button>
    </>
  );
}

export default RecordPanel;
