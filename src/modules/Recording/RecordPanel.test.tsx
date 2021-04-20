import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import RecordPanel from './RecordPanel';
import { InitialRecordState } from './state/RecordSlice';
import { RecordState, MicAvailability } from './state/RecordTypes';
import { RenderUsingState } from '../../utils/testing/RenderUsingState';

function renderRecordPanel(state?: Partial<RecordState>) {
  RenderUsingState(<RecordPanel />, {
    record: { ...InitialRecordState, ...state },
  });
}

describe('Record Button', () => {
  test('When recording should change button to stop recording button', async () => {
    renderRecordPanel({ isMicrophoneAvailable: MicAvailability.Available });

    const recordButton = screen.getByRole('button', { name: /Start Record/i });
    userEvent.click(recordButton);

    const stopRecordButton = await screen.findByRole('button', {
      name: /End Record/i,
    });

    expect(stopRecordButton).toBeVisible();
  });
});

describe('Mic Availability icon', () => {
  test('When dont have mic permission should display waiting microphone permission icon', () => {
    renderRecordPanel({ isMicrophoneAvailable: MicAvailability.NotAvailable });

    const notAvailableIcon = screen.getByTitle(
      'Waiting microphone permission',
      {
        exact: false,
      }
    );
    expect(notAvailableIcon).toBeInTheDocument();
  });

  test('When have mic permission should not display mic icon', () => {
    renderRecordPanel({ isMicrophoneAvailable: MicAvailability.Available });

    const notAvailableIcon = screen.queryByTitle(
      'Waiting microphone permission',
      {
        exact: false,
      }
    );
    expect(notAvailableIcon).toBeNull();
  });
});
