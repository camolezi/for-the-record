import MicrophoneController from './MicController';

function createMediaRecorderMock() {
  return { start: jest.fn(), stop: jest.fn(), ondataavailable: jest.fn() };
}

test('Should start and stop the browser microphone', () => {
  const mediaRecorder = createMediaRecorderMock();

  const micController = new MicrophoneController(mediaRecorder as any);

  micController.start();
  expect(mediaRecorder.start).toHaveBeenCalledTimes(1);

  micController.stop();
  expect(mediaRecorder.stop).toHaveBeenCalledTimes(1);
});
