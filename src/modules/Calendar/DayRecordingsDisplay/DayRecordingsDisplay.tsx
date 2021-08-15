import { Text, Center, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import { AudioEntryHeader } from '../../Db/types';
import RecordingItemDisplay from './RecordingItemDisplay';

interface DayRecordingsDisplayProps {
  dayRecordingHeaders: Array<AudioEntryHeader>;
}

function DayRecordingsDisplay({
  dayRecordingHeaders,
}: DayRecordingsDisplayProps): JSX.Element {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <Center
        mt="1"
        fontWeight="semibold"
        as="h2"
        lineHeight="tight"
        isTruncated
      >
        <Text fontSize="3xl">{`${dayRecordingHeaders[0].date.toLocaleDateString()}`}</Text>
      </Center>
      {dayRecordingHeaders.map((recording) => (
        <RecordingItemDisplay
          key={recording.date.toString()}
          audioEntry={recording}
        />
      ))}
    </VStack>
  );
}

export default DayRecordingsDisplay;
