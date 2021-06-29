/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */

import { audiodb } from '../../../src/modules/Db/Databases';
import { AudioEntry } from '../../../src/modules/Db/types';

function buildAudioEntry({
  date = new Date(2021, 1, 3),
  description = 'Test Description',
  length = 300,
  audio = ['a', 'b', 'c', 'd'],
}): AudioEntry {
  return {
    date,
    description,
    length,
    audio: new Blob(audio),
  };
}

describe('Audio database module', () => {
  before(() => {
    cy.visit('/');
  });

  it('should return empty array when no audio is stored', () => {
    return audiodb
      .getAllEntriesDates()
      .then((data) => expect(data).to.be.empty);
  });

  it('should create a new audio entry', () => {
    const feb_3_2021 = new Date(2021, 1, 3);

    const mockAudioEntry = buildAudioEntry({});

    return audiodb
      .addEntry(mockAudioEntry)
      .then((date) => expect(date).to.eql(mockAudioEntry.date))
      .then(async () => {
        const entries = await audiodb.getAllEntriesDates();
        expect(entries).to.deep.include(mockAudioEntry.date);
      })
      .then(async () => {
        const entry = await audiodb.getEntry(feb_3_2021);
        expect(entry).to.deep.equal(mockAudioEntry);
      });
  });

  it('should be able to query audio entries by month', async () => {
    const mockAudio_Feb_3 = buildAudioEntry({ date: new Date(2021, 1, 3) });
    const mockAudio_Feb_6 = buildAudioEntry({ date: new Date(2021, 1, 6) });
    const mockAudio_Mar_1 = buildAudioEntry({ date: new Date(2021, 2, 1) });

    await audiodb.addEntry(mockAudio_Feb_3);
    await audiodb.addEntry(mockAudio_Feb_6);
    await audiodb.addEntry(mockAudio_Mar_1);

    const audios = await audiodb.getMonthEntries(new Date(2021, 1, 3));
    expect(audios).to.deep.include(mockAudio_Feb_3.date);
    expect(audios).to.deep.include(mockAudio_Feb_6.date);
    expect(audios).to.not.deep.include(mockAudio_Mar_1.date);
  });
});

export {};
