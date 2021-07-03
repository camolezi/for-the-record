import React from 'react';
import { AudioEntryHeader } from '../../../modules/Db/types';

function RecordingItemDisplay({
  audioEntry,
}: {
  audioEntry: AudioEntryHeader;
}): JSX.Element {
  return (
    <h1>
      {`${audioEntry.date.toString()}\n${audioEntry.description}\n${
        audioEntry.length
      }`}
    </h1>
  );
}

export default RecordingItemDisplay;
