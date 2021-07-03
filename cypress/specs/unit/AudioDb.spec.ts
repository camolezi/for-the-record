/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */

import { audiodb } from '../../../src/modules/Db/Databases';
import { buildAudioEntry } from '../../support/fixtureFactories/buildAudioEntry';
import {
  ShouldIncludeObjWithProps,
  ShouldNotIncludeObjWithProps,
} from '../../support/utils/ArrayShouldInclude';

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
    const mockAudio_Feb_3 = buildAudioEntry({
      date: new Date(2021, 1, 3),
      description: 'description1',
      length: 10,
    });
    const mockAudio_Feb_6 = buildAudioEntry({
      date: new Date(2021, 1, 6),
      description: 'description2',
      length: 20,
    });
    const mockAudio_Mar_1 = buildAudioEntry({
      date: new Date(2021, 2, 1),
      description: 'description3',
      length: 30,
    });

    await audiodb.addEntry(mockAudio_Feb_3);
    await audiodb.addEntry(mockAudio_Feb_6);
    await audiodb.addEntry(mockAudio_Mar_1);

    const audios = await audiodb.getMonthEntriesHeader(new Date(2021, 1, 3));

    ShouldIncludeObjWithProps(
      audios,
      mockAudio_Feb_3,
      'date',
      'description',
      'length'
    );
    ShouldIncludeObjWithProps(
      audios,
      mockAudio_Feb_6,
      'date',
      'description',
      'length'
    );
    ShouldNotIncludeObjWithProps(
      audios,
      mockAudio_Mar_1,
      'date',
      'description',
      'length'
    );
  });

  it('should be able to query audio entries by day', async () => {
    const mockAudio_Feb_3 = buildAudioEntry({
      date: new Date(2021, 1, 3),
    });
    const mockAudio_Feb_6 = buildAudioEntry({
      date: new Date(2021, 1, 6),
    });

    await audiodb.addEntry(mockAudio_Feb_3);
    await audiodb.addEntry(mockAudio_Feb_6);

    const audios = await audiodb.getDayEntriesHeader(
      new Date(2021, 1, 3, 11, 21)
    );

    ShouldIncludeObjWithProps(audios, mockAudio_Feb_3, 'date');
    ShouldNotIncludeObjWithProps(audios, mockAudio_Feb_6, 'date');
  });
});

export {};
