import {
  askForMicrophonePermission,
  calculateNextRecordAction,
  startRecording,
  stopRecording,
} from './RecordActions';
import { MicAvailability } from './state/RecordTypes';

describe('recordButtonClicked AsyncThunk Middlware', () => {
  describe('#calculateNextRecordAction', () => {
    test('if mic not available and not recording should ask for permission', () => {
      const nextState = calculateNextRecordAction(
        MicAvailability.NotAvailable,
        false
      );
      expect(nextState).toEqual(askForMicrophonePermission);
    });

    test('if mic is available and not recording should start recording', () => {
      const nextState = calculateNextRecordAction(
        MicAvailability.Available,
        false
      );
      expect(nextState).toEqual(startRecording);
    });

    test.each([
      MicAvailability.Available,
      MicAvailability.NotAvailable,
      MicAvailability.Pending,
    ])(
      'if recording should stop recording regardless of mic state',
      (micState: MicAvailability) => {
        const nextState = calculateNextRecordAction(micState, true);
        expect(nextState).toEqual(stopRecording);
      }
    );

    test('if mic is pending and not recording should return null', () => {
      const nextState = calculateNextRecordAction(
        MicAvailability.Pending,
        false
      );
      expect(nextState).toBeNull();
    });
  });
});
