export function PromiseTimeout<T>(value: T, timeout = 1000): Promise<T> {
  return new Promise((resolve) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(value);
    }, timeout);
  });
}
