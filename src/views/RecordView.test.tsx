import React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import RecordView from './RecordView';
import WrapWithProviders from '../app/Providers';

function renderRecordView() {
  render(WrapWithProviders(<RecordView />));
}

function createNavigatorMock() {
  const navigatorMock = {
    mediaDevices: {
      getUserMedia: jest.fn(),
    },
  };
  jest.spyOn(window, 'navigator', 'get').mockReturnValue(navigatorMock as any);

  return navigatorMock;
}

test('RecordView should have a start record button', () => {
  renderRecordView();
  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  expect(recordButton).toBeVisible();
});

test('Should ask for permission when record button is first clicked', () => {
  renderRecordView();

  const navigatorMock = createNavigatorMock();

  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  userEvent.click(recordButton);

  expect(navigatorMock.mediaDevices.getUserMedia).toBeCalledTimes(1);
});
