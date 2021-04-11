export interface RecordState {
  isRecording: boolean;
  isMicrophoneAvailable: 'available' | 'not-available' | 'pending';
}
