import React from 'react';
import {
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../app/Store';
import {
  selectAudioDuration,
  selectCurrentAudioCompletedPercentage,
  selectCurrentAudioTime,
} from '../state/PlaybackSelectors';

import audio from '../AudioController/AudioController';
import AudioDuration from './AudioDuration';

function seekAudioTo(sliderValue: number): void {
  const duration = audio.getAudioDuration();
  const seekPosition = duration * (sliderValue / 100);
  audio.seekTo(seekPosition);
}

function AudioSlider(): JSX.Element {
  const audioDuration = useTypedSelector(selectAudioDuration);

  const audioPercentage = useTypedSelector(
    selectCurrentAudioCompletedPercentage
  );

  const currentPosition = useTypedSelector(selectCurrentAudioTime);

  return (
    <HStack spacing={3}>
      <Text fontSize="2xl">{currentPosition.toFixed(2)}</Text>

      <Slider
        aria-label="AudioPlaybackSlider"
        defaultValue={0}
        value={audioPercentage}
        focusThumbOnChange={false}
        onChange={(value) => {
          seekAudioTo(value);
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <AudioDuration duration={audioDuration} />
    </HStack>
  );
}

export default AudioSlider;
