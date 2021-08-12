import {
  changedAudioTime,
  loadAudioDuration,
  stopPlayingRecord,
} from '../../modules/Playback/actions/PlaybackActions';
import audio from '../../modules/Playback/AudioController/AudioController';

type ActionFunction = (dispatch: (v: unknown) => Promise<void>) => void;

const OnPageLoadActions: Array<ActionFunction> = [
  (dispatch): void => {
    audio.onAudioDurantionChange(() => {
      dispatch(loadAudioDuration());
    });
  },
  (dispatch): void => {
    audio.onCurrentTimeUpdate((currentTime) => {
      dispatch(changedAudioTime(currentTime));
    });
  },
  (dispatch): void => {
    audio.onAudioPlaybackEnd(() => {
      dispatch(stopPlayingRecord());
    });
  },
];

export default OnPageLoadActions;
