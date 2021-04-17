import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import RecordPanel from './RecordPanel';
import { InitialRecordState } from './state/RecordSlice';
import { RecordState, MicAvailability } from './state/RecordTypes';
import RenderUsingState from '../../utils/testing/RenderUsingState';

function renderRecordPanel(state?: Partial<RecordState>) {
  RenderUsingState(<RecordPanel />, {
    record: { ...InitialRecordState, ...state },
  });
}

test('View should have a start record button', () => {
  renderRecordPanel();
  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  expect(recordButton).toBeVisible();
});

test('When recording should change button to stop recording button', async () => {
  renderRecordPanel({ isMicrophoneAvailable: MicAvailability.Available });

  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  userEvent.click(recordButton);

  const stopRecordButton = await screen.findByRole('button', {
    name: /End Record/i,
  });

  expect(stopRecordButton).toBeVisible();
});
