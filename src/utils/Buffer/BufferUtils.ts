import _ from 'lodash';

export function isBuffersEql(
  buffer1: ArrayBuffer,
  buffer2: ArrayBuffer
): boolean {
  const data1 = new Uint8Array(buffer1);
  const data2 = new Uint8Array(buffer2);

  return _.isEqual(data1, data2);
}

export function ArrayBufferToStr(data: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(data);
}

export function StrToArrayBuffer(data: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(data);
}
