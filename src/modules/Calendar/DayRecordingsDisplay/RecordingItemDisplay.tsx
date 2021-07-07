/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useTypedDispatch } from '../../../app/Store';
import { AudioEntryHeader } from '../../Db/types';
import { loadAudioPlayback } from '../actions/CalendarActions';

function RecordingItemDisplay({
  audioEntry,
}: {
  audioEntry: AudioEntryHeader;
}): JSX.Element {
  const dispatch = useTypedDispatch();
  return (
    <h1 onClick={() => dispatch(loadAudioPlayback(audioEntry.date))}>
      {`${audioEntry.date.toString()}\n${audioEntry.description}\n${
        audioEntry.length
      }`}
    </h1>
  );
}

export default RecordingItemDisplay;
