import MicrophoneController from './MicController';

export class Microphone {
  private microphoneController: MicrophoneController | null = null;

  async askForUserPermission(): Promise<void> {
    if (this.microphoneController) return;

    const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const media = new MediaRecorder(microphoneStream, {
      mimeType: 'audio/ogg; codecs=opus',
    });
    this.microphoneController = new MicrophoneController(media);
  }

  startRecording(): void {
    if (this.microphoneController) this.microphoneController.start();
  }

  async stopRecording(): Promise<Blob | null> {
    if (!this.microphoneController) return null;
    return this.microphoneController.stop();
  }
}

const microphone = new Microphone();
export default microphone;
