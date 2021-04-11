export default class MicrophoneController {
  private readonly mediaRecorder: MediaRecorder;

  private dataChunks: Blob[] = new Array<Blob>();

  constructor(mediaRecorder: MediaRecorder) {
    this.mediaRecorder = mediaRecorder;

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };
  }

  start(): void {
    this.mediaRecorder.start();
  }

  stop(): void {
    this.mediaRecorder.stop();
    console.log(this.dataChunks);
  }
}
