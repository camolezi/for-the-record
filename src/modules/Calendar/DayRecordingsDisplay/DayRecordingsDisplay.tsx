import { StackDivider, VStack } from '@chakra-ui/react';
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
