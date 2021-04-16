/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';

import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';

import { MdForward10, MdReplay10, MdStop, MdPlayArrow } from 'react-icons/md';
import AudioEntriesInstance from '../modules/Db/AudioEntries';

interface Props {
  audioSrc: string;
}

function AudioPlayer({ audioSrc }: Props): JSX.Element {
  console.log(audioSrc);
  const [audioUrl, setAudioUrl] = useState('');
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
          onClick={async () => {
            // const data = await AudioEntriesInstance.getEntry('abc');
            // console.log('recivedData', data);
            // if (data && data.length > 0) {
            //   console.log('has data');
            //   const audioURL = window.URL.createObjectURL(data[0].audio);
            //   setAudioUrl(audioURL);
            // }
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
      <audio controls src={audioUrl} />
    </>
  );
}

export default AudioPlayer;
