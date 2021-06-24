import { Maybe } from 'purify-ts/Maybe';
import { MaybeAsync } from 'purify-ts/MaybeAsync';

export function getFirst<T>(array: T[]): MaybeAsync<T> {
  return MaybeAsync.liftMaybe(Maybe.fromFalsy(array[0]));
}

export function WithTrace<I, R>(func: (inpu: I) => R, message = '') {
  return (input: I): R => {
    console.log(`TRACE:${message} `, input);
    // debugger;
    return func(input);
  };
}
