import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import { useTypedDispatch } from '../../../app/Store';
import MotionBox from '../../../components/Motion/MotionBox';
import { AudioEntryHeader } from '../../Db/types';
import { loadAudioPlayback } from '../actions/CalendarActions';

function RecordingItemDisplay({
  audioEntry,
}: {
  audioEntry: AudioEntryHeader;
}): JSX.Element {
  const dispatch = useTypedDispatch();
  return (
    <Center width="100%">
      <MotionBox
        as="button"
        width="100%"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
        p="2"
        onClick={() => dispatch(loadAudioPlayback(audioEntry.date))}
      >
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {audioEntry.date.toString()}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          {`${audioEntry.description} ${audioEntry.length}s`}
        </Box>
      </MotionBox>
    </Center>
  );
}

export default RecordingItemDisplay;
