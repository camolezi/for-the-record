import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('Control buttons should be visable', () => {
  test.each(['PlayPause', 'Stop', 'Rewind', 'Forward'])(
    'button %p should be visible',
    (name) => {
      render(<AudioPlayer audioSrc="" />);
      const controlButton = screen.getByRole('button', { name, exact: false });
      expect(controlButton).toBeVisible();
    }
  );
});
