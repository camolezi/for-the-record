import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('Control buttons should be visable', () => {
  test.each(['Play', 'Stop', 'Rwd', 'Fwd'])(
    'button %p should be visible',
    (name) => {
      render(<AudioPlayer audioSrc="" />);
      const controlButton = screen.getByRole('button', { name });
      expect(controlButton).toBeVisible();
    }
  );
});
