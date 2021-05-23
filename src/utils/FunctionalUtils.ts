import { Maybe } from 'purify-ts/Maybe';
import { MaybeAsync } from 'purify-ts/MaybeAsync';

export function getFirst<T>(array: T[]): MaybeAsync<T> {
  return MaybeAsync.liftMaybe(Maybe.fromFalsy(array[0]));
}
