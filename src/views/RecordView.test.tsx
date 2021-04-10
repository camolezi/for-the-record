import React from 'react';
import { render, screen } from '@testing-library/react';

import RecordView from './RecordView';
import WrapWithProviders from '../app/Providers';

function renderRecordView() {
  render(WrapWithProviders(<RecordView />));
}

test('RecordView should have a start record button', () => {
  renderRecordView();

  const recordButton = screen.getByRole('button', { name: /Start Record/i });

  expect(recordButton).toBeVisible();
});
