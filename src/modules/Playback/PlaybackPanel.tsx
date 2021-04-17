/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { useTypedSelector } from '../../app/Store';
import AudioPlayer from './components/AudioPlayer';
import { selectAudioUrl } from './state/PlaybackSelectors';

function PlaybackPanel(): JSX.Element {
  const url = useTypedSelector(selectAudioUrl);
  return (
    <>
      <audio src={url} />
      <AudioPlayer />
    </>
  );
}

export default PlaybackPanel;
