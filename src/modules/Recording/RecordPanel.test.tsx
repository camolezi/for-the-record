import React from 'react';
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

describe('Mic Availability icon', () => {
  test('When dont have mic permission should display waiting microphone permission icon', () => {
    renderRecordPanel({ isMicrophoneAvailable: MicAvailability.NotAvailable });

    const notAvailableIcon = screen.getByTitle(
      'microphone not authorized or available',
      {
        exact: false,
      }
    );
    expect(notAvailableIcon).toBeInTheDocument();
  });

  test('When have mic permission should not display mic icon', () => {
    renderRecordPanel({ isMicrophoneAvailable: MicAvailability.Available });

    const notAvailableIcon = screen.queryByTitle(
      'microphone not authorized or available',
      {
        exact: false,
      }
    );
    expect(notAvailableIcon).toBeNull();
  });
});
