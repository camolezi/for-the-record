import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import RecordView from './RecordView';
import WrapWithProviders from '../app/Providers';
import { CreateStore } from '../app/Store';
import microphone from '../modules/Recording/Microphone/Microphone';
import { InitialRecordState } from '../modules/Recording/state/RecordSlice';
import {
  MicAvailability,
  RecordState,
} from '../modules/Recording/state/RecordTypes';

function renderRecordView(state?: Partial<RecordState>) {
  render(
    WrapWithProviders(
      <RecordView />,
      CreateStore({
        record: {
          ...InitialRecordState,
          ...state,
        },
      })
    )
  );
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

test('Should ask for browser permission when record button is first clicked', async () => {
  renderRecordView();
  const [navigatorMock, restore] = createNavigatorMock();

  const recordButton = screen.getByRole('button', { name: /Start Record/i });

  userEvent.click(recordButton);
  await waitFor(() =>
    expect(navigatorMock.mediaDevices.getUserMedia).toBeCalledTimes(1)
  );

  restore();
});

test('If microphone is available, should start recording when record button is clicked and stop when end record button is pressed', async () => {
  renderRecordView({ isMicrophoneAvailable: MicAvailability.Available });

  const startRecording = jest.spyOn(microphone, 'startRecording');
  const stopRecording = jest.spyOn(microphone, 'stopRecording');

  const recordButton = screen.getByRole('button', { name: /Start Record/i });
  userEvent.click(recordButton);

  await waitFor(() => expect(startRecording).toHaveBeenCalledTimes(1));

  const stopRecordButton = await screen.findByRole('button', {
    name: /End Record/i,
  });
  userEvent.click(stopRecordButton);
  await waitFor(() => expect(stopRecording).toHaveBeenCalledTimes(1));
});
