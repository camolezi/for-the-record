import { loadAudioDuration } from '../../modules/Playback/actions/PlaybackActions';
import audio from '../../modules/Playback/AudioController/AudioController';

type ActionFunction = (dispatch: (v: unknown) => void) => void;

const OnPageLoadActions: Array<ActionFunction> = [
  (dispatch): void => {
    audio.onAudioDurantionChange(() => {
      dispatch(loadAudioDuration());
    });
  },
];

export default OnPageLoadActions;
