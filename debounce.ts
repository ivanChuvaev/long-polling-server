export function debounce<P extends Array<unknown>>(cb: (...args: P) => void, timeout: number) {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: P): void => {
      clearTimeout(timerId);
      timerId = setTimeout(() => cb(...args), timeout);
  };
}
