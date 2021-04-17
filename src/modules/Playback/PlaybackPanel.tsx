import React from 'react';
import { useTypedSelector } from '../../app/Store';
import AudioPlayer from './AudioPlayer';

function PlaybackPanel(): JSX.Element {
  const url = useTypedSelector((state) => state.playback.audioUrl);
  return <AudioPlayer audioSrc={url} />;
}

export default PlaybackPanel;
