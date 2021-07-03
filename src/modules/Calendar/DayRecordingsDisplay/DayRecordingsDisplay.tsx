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
    <>
      {dayRecordingHeaders.map((recording) => (
        <RecordingItemDisplay
          key={recording.date.toString()}
          audioEntry={recording}
        />
      ))}
    </>
  );
}

export default DayRecordingsDisplay;
