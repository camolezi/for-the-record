// TODO - add error handling
export default class MicrophoneController {
  private readonly mediaRecorder: MediaRecorder;

  private dataChunks: Blob[];

  constructor(mediaRecorder: MediaRecorder) {
    this.mediaRecorder = mediaRecorder;
    this.dataChunks = new Array<Blob>();

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };

    this.mediaRecorder.onerror = (event) => console.log(event);
  }

  start(): void {
    this.dataChunks = new Array<Blob>();
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
      type: this.mediaRecorder.mimeType,
    });
    return blob;
  }
}
