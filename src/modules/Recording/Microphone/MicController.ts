export default class MicrophoneController {
  private readonly mediaRecorder: MediaRecorder;

  private readonly dataChunks: Blob[];

  constructor(mediaRecorder: MediaRecorder) {
    this.mediaRecorder = mediaRecorder;
    this.dataChunks = new Array<Blob>();

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.dataChunks.push(event.data);
    };

    // this.mediaRecorder.onstop = (_event: any) => {
    //   console.log('onStop');
    //   const audio = document.createElement('audio');
    //   audio.controls = true;
    //   const blob = new Blob(this.dataChunks, {
    //     type: 'audio/ogg; codecs=opus',
    //   });
    //   const audioURL = window.URL.createObjectURL(blob);
    //   audio.src = audioURL;
    //   document.body.appendChild(audio);
    // };
  }

  start(): void {
    this.mediaRecorder.start();
  }

  stop(): void {
    this.mediaRecorder.stop();
  }

  getRecordedData(): Blob[] {
    return this.dataChunks;
  }
}
