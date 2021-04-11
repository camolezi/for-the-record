import MicrophoneController from './MicController';

export class Microphone {
  private microphoneController: MicrophoneController | null = null;

  async askForUserPermission(): Promise<void> {
    const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const media = new MediaRecorder(microphoneStream);

    this.microphoneController = new MicrophoneController(media);
  }

  startRecording(): void {
    if (this.microphoneController) this.microphoneController.start();
  }

  stopRecording(): void {
    if (this.microphoneController) this.microphoneController.stop();
  }
}

const microphone = new Microphone();
export default microphone;
