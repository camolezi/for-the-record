// TODO - add error handling
export default class MicrophoneController {
  private readonly mediaRecorder: MediaRecorder;

  private readonly dataChunks: Blob[];

  constructor(mediaRecorder: MediaRecorder) {
    this.mediaRecorder = mediaRecorder;
    this.dataChunks = new Array<Blob>();

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };
  }

  start(): void {
    this.mediaRecorder.start();
  }

  stop(): Promise<Blob> {
    const stopPromise = new Promise<Blob>((resolve) => {
      this.mediaRecorder.onstop = () => {
        resolve(this.getRecordedData());
      };
    });

    this.mediaRecorder.stop();

    return stopPromise;
  }

  getRecordedData(): Blob {
    const blob = new Blob(this.dataChunks, {
      type: 'audio/ogg; codecs=opus',
    });
    return blob;
  }
}
