import _ from 'lodash';

export class AudioController {
  private audio: HTMLAudioElement;

  constructor() {
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    document.body.append(audio);
    this.audio = audio;

    // Workaround for bug in chrome
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration === Infinity) {
        audio.currentTime = Number.MAX_SAFE_INTEGER;

        audio.ontimeupdate = () => {
          audio.ontimeupdate = () => {};

          audio.currentTime = 0.1;
          audio.currentTime = 0;
        };
      }
    });
  }

  setAudioSource(src: string): void {
    this.stopPlaying();
    this.audio.src = src;
    this.audio.load();
    this.audio.currentTime = 0;
  }

  startPlaying(): void {
    this.audio.play();
  }

  pausePlaying(): void {
    this.audio.pause();
  }

  stopPlaying(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  private clipToAudioDuration(position: number): number {
    if (Number.isNaN(position)) return 0;
    return _.clamp(position, 0, this.audio.duration);
  }

  seekTo(position: number): void {
    const seekPosition = this.clipToAudioDuration(position);
    this.audio.currentTime = seekPosition;
  }

  seekRelativeToCurrent(addToCurrentTime: number): void {
    const seekPosition = this.audio.currentTime + addToCurrentTime;
    this.seekTo(seekPosition);
  }

  getAudioDuration(): number {
    const { duration } = this.audio;

    if (Number.isNaN(duration) || !Number.isFinite(duration)) return 0;
    return duration ?? 0;
  }

  getCurrentTime(): number {
    return this.clipToAudioDuration(this.audio.currentTime);
  }

  onAudioDurantionChange(func: (newAudioDuration: number) => void): void {
    this.audio.addEventListener('durationchange', () => {
      func(this.getAudioDuration());
    });
  }

  onAudioPlaybackEnd(func: (endTime: number) => void): void {
    this.audio.addEventListener('ended', () => {
      func(this.audio.currentTime);
    });
  }

  onCurrentTimeUpdate(
    func: (newTime: number) => void,
    updatePeriod = 100
  ): void {
    let shouldUpdate = true;

    const callUpdatePeriod = () => {
      if (shouldUpdate) {
        func(this.getCurrentTime());

        setTimeout(() => {
          shouldUpdate = true;
        }, updatePeriod);
      }
      shouldUpdate = false;
    };

    this.audio.addEventListener('timeupdate', () => {
      callUpdatePeriod();
    });

    this.audio.addEventListener('ended', () => {
      func(this.getCurrentTime());
    });

    this.audio.addEventListener('seeked', () => {
      func(this.getCurrentTime());
    });

    this.audio.addEventListener('loadedmetadata', () => {
      func(this.getCurrentTime());
    });
  }
}

const audio = new AudioController();
export default audio;
