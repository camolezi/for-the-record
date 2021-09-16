import React from 'react';
import { Text } from '@chakra-ui/react';
import MotionBox from '../../../components/Motion/MotionBox';

interface AudioDurationProps {
  duration: number;
}

function AudioDuration({ duration }: AudioDurationProps): JSX.Element {
  return (
    <MotionBox
      key={`AudioDuration_${duration}`}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
    >
      <Text fontSize="2xl">{duration.toFixed(2)}</Text>
    </MotionBox>
  );
}

export default AudioDuration;
