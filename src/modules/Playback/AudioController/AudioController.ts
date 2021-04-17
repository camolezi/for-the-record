/* eslint-disable class-methods-use-this */

export class AudioController {
  startPlaying(): void {
    const player = document.querySelector('audio');
    if (player) player.play();
  }

  pausePlaying(): void {
    const player = document.querySelector('audio');
    if (player) player.pause();
  }
}

const audio = new AudioController();
export default audio;
