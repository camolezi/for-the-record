import { audiodb } from '../../../src/modules/Db/Databases';
import { AudioEntry } from '../../../src/modules/Db/types';

export function buildAudioEntry({
  date = new Date(2021, 1, 3),
  description = 'Test Description',
  length = 300,
  audio = new Blob(['a', 'b', 'c', 'd']),
}: Partial<AudioEntry>): AudioEntry {
  return {
    date,
    description,
    length,
    audio,
  };
}

export async function addAudioRecording(
  entry: Partial<AudioEntry>
): Promise<void> {
  await audiodb.addEntry(buildAudioEntry({ ...entry }));
}
