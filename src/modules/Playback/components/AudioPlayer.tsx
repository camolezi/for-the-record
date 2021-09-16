import React from 'react';
import { Grid, GridItem, Icon, IconButton } from '@chakra-ui/react';
import {
  MdForward10,
  MdReplay10,
  MdStop,
  MdPlayArrow,
  MdPause,
} from 'react-icons/md';
import { useTypedDispatch, useTypedSelector } from '../../../app/Store';

import {
  selectAudioDuration,
  selectIsPlaying,
} from '../state/PlaybackSelectors';
import {
  pausePlayButtonClicked,
  seekBackwards,
  seekFowards,
  stopPlayingRecord,
} from '../actions/PlaybackActions';
import AudioSlider from './AudioSlider';

function AudioPlayer(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isPlaying = useTypedSelector(selectIsPlaying);
  const audioDuration = useTypedSelector(selectAudioDuration);

  return (
    <Grid
      p={[3, 3, 4, 5]}
      templateColumns="1fr repeat(3, auto) 1fr"
      justifyItems="center"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <GridItem colStart={2}>
        <IconButton
          isRound
          colorScheme="green"
          aria-label="Rewind"
          size="md"
          mx={2}
          icon={<Icon boxSize={6} as={MdReplay10} />}
          onClick={() => {
            dispatch(seekBackwards());
          }}
        />
      </GridItem>
      <GridItem>
        <IconButton
          isRound
          colorScheme="green"
          aria-label="PlayPause"
          size="lg"
          mx={['0.5', '1.5', '2.5', '3']}
          disabled={audioDuration === 0}
          icon={
            isPlaying ? (
              <Icon boxSize={8} as={MdPause} />
            ) : (
              <Icon boxSize={8} as={MdPlayArrow} />
            )
          }
          onClick={() => {
            dispatch(pausePlayButtonClicked());
          }}
        />
      </GridItem>
      <GridItem>
        <IconButton
          isRound
          colorScheme="green"
          aria-label="Forward"
          size="md"
          mx={2}
          icon={<Icon boxSize={6} as={MdForward10} />}
          onClick={() => {
            dispatch(seekFowards());
          }}
        />
      </GridItem>
      <GridItem>
        <IconButton
          isRound
          marginLeft={['4', '5', '12']}
          colorScheme="red"
          aria-label="Stop"
          size="sm"
          icon={<Icon boxSize={4} as={MdStop} />}
          onClick={() => {
            dispatch(stopPlayingRecord());
          }}
        />
      </GridItem>

      <GridItem width="100%" colSpan={5} px={5}>
        <AudioSlider />
      </GridItem>
    </Grid>
  );
}

export default AudioPlayer;
