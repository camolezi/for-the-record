/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

interface Props {
  audioSrc: string;
}

function AudioPlayer({ audioSrc }: Props): JSX.Element {
  return <audio controls src={audioSrc} />;
}

export default AudioPlayer;
