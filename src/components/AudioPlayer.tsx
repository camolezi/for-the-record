/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';

import { MdForward10, MdReplay10, MdStop, MdPlayArrow } from 'react-icons/md';

interface Props {
  audioSrc: string;
}

function AudioPlayer({ audioSrc }: Props): JSX.Element {
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
          icon={<Icon as={MdPlayArrow} />}
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
      <audio controls src={audioSrc} />
    </>
  );
}

export default AudioPlayer;
