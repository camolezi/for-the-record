export class Microphone {
  private stream: MediaStream | null = null;

  private mediaRecorder: MediaRecorder | null = null;

  private dataChunks: Blob[] = new Array<Blob>();

  async askForUserPermission(): Promise<void> {
    const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    this.stream = microphoneStream;
    const media = new MediaRecorder(microphoneStream);

    media.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };

    media.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };

    this.mediaRecorder = media;
  }

  startRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.start();
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      console.log(this.dataChunks);
    }
  }
}

const microphone = new Microphone();
export default microphone;
