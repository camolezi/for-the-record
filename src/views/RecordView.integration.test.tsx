// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';
// import RecordView from './RecordView';

// import microphone from '../modules/Recording/Microphone/Microphone';
// import { InitialRecordState } from '../modules/Recording/state/RecordSlice';
// import {
//   MicAvailability,
//   RecordState,
// } from '../modules/Recording/state/RecordTypes';
// import { RenderUsingState } from '../utils/testing/RenderUsingState';

// beforeAll(() => jest.restoreAllMocks());

// function renderRecordView(state?: Partial<RecordState>) {
//   RenderUsingState(<RecordView />, {
//     record: { ...InitialRecordState, ...state },
//   });
// }

export {};

test('temp', () => {
  expect(1).toBe(1);
});

// // function createNavigatorMock(): [Navigator, () => void] {
// //   const navigatorMock: Navigator = {
// //     ...navigator,
// //     mediaDevices: {
// //       ...navigator.mediaDevices,
// //       getUserMedia: jest.fn().mockResolvedValue(true),
// //     },
// //   };

// //   const spy = jest
// //     .spyOn(window, 'navigator', 'get')
// //     .mockReturnValue(navigatorMock);

// //   return [navigatorMock, () => spy.mockRestore()];
// // }

// // test('Should ask for browser permission when page is loaded', async () => {
// //   const [navigatorMock, restore] = createNavigatorMock();

// //   renderRecordView();

// //   // const recordButton = screen.getByRole('button', { name: /Start Record/i });

// //   // userEvent.click(recordButton);
// //   await waitFor(() =>
// //     expect(navigatorMock.mediaDevices.getUserMedia).toBeCalledTimes(1)
// //   );

// //   restore();
// // });

// // test('If microphone is available, should start recording when record button is clicked and stop when end record button is pressed', async () => {
// //   renderRecordView({ isMicrophoneAvailable: MicAvailability.Available });

// //   const startRecording = jest.spyOn(microphone, 'startRecording');
// //   const stopRecording = jest.spyOn(microphone, 'stopRecording');

// //   const recordButton = screen.getByRole('button', { name: /Start Record/i });
// //   userEvent.click(recordButton);

// //   await waitFor(() => expect(startRecording).toHaveBeenCalledTimes(1));

// //   const stopRecordButton = await screen.findByRole('button', {
// //     name: /End Record/i,
// //   });
// //   userEvent.click(stopRecordButton);
// //   await waitFor(() => expect(stopRecording).toHaveBeenCalledTimes(1));
// // });

// // test('When microphone stop should create a url', async () => {
// //   const createUrlSpy = jest.fn();
// //   jest.spyOn(window, 'URL').mockImplementation(() => {
// //     return {
// //       createObjectURL: createUrlSpy,
// //     } as any;
// //   });

// //   const newStopRecording = jest
// //     .spyOn(microphone, 'stopRecording')
// //     .mockResolvedValue(new Blob(['a']));

// //   renderRecordView({
// //     isMicrophoneAvailable: MicAvailability.Available,
// //     isRecording: true,
// //   });

// //   const recordButton = screen.getByRole('button', { name: /End Record/i });
// //   userEvent.click(recordButton);

// //   await waitFor(() =>
// //     expect(microphone.stopRecording).toHaveBeenCalledTimes(1)
// //   );

// //   await waitFor(() => expect(createUrlSpy).toHaveBeenCalledTimes(1));
// // });
