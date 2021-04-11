import React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import RecordView from './RecordView';
import WrapWithProviders from '../app/Providers';
import { CreateStore } from '../app/store';

function renderRecordView() {
  render(WrapWithProviders(<RecordView />, CreateStore()));
}

function createNavigatorMock(): [Navigator, () => void] {
  const navigatorMock: Navigator = {
    ...navigator,
    mediaDevices: {
      ...navigator.mediaDevices,
      getUserMedia: jest.fn().mockResolvedValue(true),
    },
  };

  const spy = jest
    .spyOn(window, 'navigator', 'get')
    .mockReturnValue(navigatorMock);

  return [navigatorMock, () => spy.mockRestore()];
}

test('RecordView should have a start record button', () => {
  renderRecordView();
  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  expect(recordButton).toBeVisible();
});

test('Should ask for permission when record button is first clicked', () => {
  renderRecordView();

  const [navigatorMock, restore] = createNavigatorMock();

  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  userEvent.click(recordButton);

  expect(navigatorMock.mediaDevices.getUserMedia).toBeCalledTimes(1);

  restore();
});
