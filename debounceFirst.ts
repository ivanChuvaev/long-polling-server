function debounceFirst<P extends Array<unknown>>(
  cb: (...args: P) => void,
  timeout: number,
) {
  let timerId: ReturnType<typeof setTimeout>;
  let lastTimeCalled = 0;
  return (...args: P): void => {
    clearTimeout(timerId);
    const diffTime = new Date().getTime() - lastTimeCalled;
    lastTimeCalled = new Date().getTime();
    if (diffTime < timeout) {
      timerId = setTimeout(() => cb(...args), timeout - diffTime);
      return
    }
    cb(...args);
  };
}
