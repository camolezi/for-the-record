export enum MicAvailability {
  Available,
  NotAvailable,
  Pending,
}

export interface RecordState {
  isRecording: boolean;
  isMicrophoneAvailable: MicAvailability;
}
