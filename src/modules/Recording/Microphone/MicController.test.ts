/* eslint-disable func-names */
import MicrophoneController from './MicController';

function createMediaRecorderMock(): MediaRecorder {
  return ({
    start: jest.fn(),
    stop: jest.fn(function (this: MediaRecorder) {
      if (this.onstop) this.onstop(new Event(''));
    }),
  } as unknown) as MediaRecorder;
}

test('Should start and stop the browser microphone', () => {
  const mediaRecorder = createMediaRecorderMock();

  const micController = new MicrophoneController(mediaRecorder);

  micController.start();
  expect(mediaRecorder.start).toHaveBeenCalledTimes(1);

  micController.stop();
  expect(mediaRecorder.stop).toHaveBeenCalledTimes(1);
});

test('Should store all received blobs', async () => {
  const mediaRecorder = createMediaRecorderMock();
  const blob = { data: new Blob(['a', 'b', 'c']) } as BlobEvent;

  const micController = new MicrophoneController(mediaRecorder);
  micController.start();

  expect(mediaRecorder.ondataavailable).toBeDefined();

  (mediaRecorder as any).ondataavailable(blob);
  (mediaRecorder as any).ondataavailable(blob);

  const recordedData = await micController.stop();
  expect(recordedData).toEqual(new Blob([blob.data, blob.data]));

  const data = micController.getRecordedData();
  expect(data).toEqual(new Blob([blob.data, blob.data]));
});
