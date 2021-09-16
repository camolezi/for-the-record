import React from 'react';
import { Text } from '@chakra-ui/react';
import MotionBox from '../../../components/Motion/MotionBox';
import { formatSecondsToCounter } from '../../../utils/DateTime/WeekDays';

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
      <Text fontSize="2xl">{formatSecondsToCounter(duration)}</Text>
    </MotionBox>
  );
}

export default AudioDuration;
