export class AudioController {
  private audio: HTMLAudioElement;

  constructor() {
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    document.body.append(audio);
    this.audio = audio;
  }

  setAudioSource(src: string): void {
    this.audio.src = src;
    this.audio.load();
  }

  startPlaying(): void {
    this.audio.play();
  }

  pausePlaying(): void {
    this.audio.pause();
  }

  getAudioDuration(): number {
    const { duration } = this.audio;
    console.log('duration', duration);

    if (Number.isNaN(duration)) return 0;
    return duration ?? 0;
  }

  onAudioDurantionChange(func: (newAudioDuration: number) => void): void {
    this.audio.addEventListener('durationchange', () => {
      func(this.getAudioDuration());
    });
  }
}

const audio = new AudioController();
export default audio;
