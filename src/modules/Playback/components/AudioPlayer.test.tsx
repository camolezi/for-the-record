import React from 'react';
import { screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';
import { RenderDefaultState } from '../../../utils/testing/RenderUsingState';

describe('Control buttons should be visable', () => {
  test.each(['PlayPause', 'Stop', 'Rewind', 'Forward'])(
    'button %p should be visible',
    (name) => {
      RenderDefaultState(<AudioPlayer />);
      const controlButton = screen.getByRole('button', { name, exact: false });
      expect(controlButton).toBeVisible();
    }
  );
});
