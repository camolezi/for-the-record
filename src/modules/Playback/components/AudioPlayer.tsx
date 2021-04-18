import React from 'react';
import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import {
  MdForward10,
  MdReplay10,
  MdStop,
  MdPlayArrow,
  MdPause,
} from 'react-icons/md';
import { useTypedDispatch, useTypedSelector } from '../../../app/Store';

import { selectIsPlaying } from '../state/PlaybackSelectors';
import { pausePlayButtonClicked } from '../actions/PlaybackActions';

function AudioPlayer(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isPlaying = useTypedSelector(selectIsPlaying);

  return (
    <>
      <ButtonGroup variant="outline" spacing="3">
        <IconButton
          colorScheme="teal"
          aria-label="Forward"
          size="lg"
          icon={<Icon as={MdForward10} />}
        />
        <IconButton
          colorScheme="teal"
          aria-label="PlayPause"
          size="lg"
          icon={isPlaying ? <Icon as={MdPause} /> : <Icon as={MdPlayArrow} />}
          onClick={() => {
            dispatch(pausePlayButtonClicked());
          }}
        />
        <IconButton
          colorScheme="teal"
          aria-label="Stop"
          size="lg"
          icon={<Icon as={MdStop} />}
        />
        <IconButton
          colorScheme="teal"
          aria-label="Rewind"
          size="lg"
          icon={<Icon as={MdReplay10} />}
        />
      </ButtonGroup>
    </>
  );
}

export default AudioPlayer;
