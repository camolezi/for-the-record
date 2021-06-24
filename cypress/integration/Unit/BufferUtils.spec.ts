/* eslint-disable no-unused-expressions */
import {
  isBuffersEql,
  StrToUint8Array,
  Uint8ArrayToStr,
} from '../../../src/utils/Buffer/BufferUtils';

describe('BufferUtils', () => {
  it('Should convert buffer to string, and string to buffer', () => {
    const array = Uint8Array.from([
      89, 29, 0, 122, 79, 35, 158, 20, 80, 165, 156, 95, 125, 141, 168, 189,
    ]);
    const string = Uint8ArrayToStr(array);
    const arrayFromString = StrToUint8Array(string);

    expect(array).eql(arrayFromString);
    expect(isBuffersEql(arrayFromString, array)).to.be.true;
  });
});
