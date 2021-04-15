import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import WrapWithProviders from '../../app/Providers';
import { CreateStore } from '../../app/Store';
import RecordPanel from './RecordPanel';
import { InitialRecordState } from './state/RecordSlice';
import { RecordState, MicAvailability } from './state/RecordTypes';

function renderRecordPanel(state?: Partial<RecordState>) {
  render(
    WrapWithProviders(
      <RecordPanel />,
      CreateStore({
        record: {
          ...InitialRecordState,
          ...state,
        },
      })
    )
  );
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
