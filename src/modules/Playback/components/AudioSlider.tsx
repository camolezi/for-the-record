import React from 'react';
import {
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../app/Store';
import { selectAudioDuration } from '../state/PlaybackSelectors';

function AudioSlider(): JSX.Element {
  const audioDuration = useTypedSelector(selectAudioDuration);

  return (
    <Box>
      <Slider aria-label="slider-ex-1" defaultValue={30}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <span>{audioDuration}</span>
    </Box>
  );
}

export default AudioSlider;
