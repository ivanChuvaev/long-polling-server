import { Injectable } from '@nestjs/common';

type Event1Seconds = {
  eventName: '1-seconds';
  callback: () => void;
};

type Event5Seconds = {
  eventName: '5-seconds';
  callback: () => void;
};

type Event10Seconds = {
  eventName: '10-seconds';
  callback: () => void;
};

type AnyEvent = Event1Seconds | Event5Seconds | Event10Seconds;

@Injectable()
export class TimerService {
  private timeout1SecondsCallbacks: Map<
    Event1Seconds['callback'],
    Event1Seconds['callback']
  >;
  private timeout5SecondsCallbacks: Map<
    Event5Seconds['callback'],
    Event5Seconds['callback']
  >;
  private timeout10SecondsCallbacks: Map<
    Event10Seconds['callback'],
    Event10Seconds['callback']
  >;
  private intervalId1Seconds: NodeJS.Timeout;
  private intervalId5Seconds: NodeJS.Timeout;
  private intervalId10Seconds: NodeJS.Timeout;

  constructor() {
    this.intervalId1Seconds = setInterval(() => {
      console.log('1 second');
      this.timeout1SecondsCallbacks.forEach((cb) => {
        cb();
      });
    }, 1_000);
    this.intervalId5Seconds = setInterval(() => {
      console.log('5 seconds');
      this.timeout5SecondsCallbacks.forEach((cb) => {
        cb();
      });
    }, 5_000);
    this.intervalId10Seconds = setInterval(() => {
      console.log('10 seconds');
      this.timeout10SecondsCallbacks.forEach((cb) => {
        cb();
      });
    }, 10_000);
    this.timeout1SecondsCallbacks = new Map();
    this.timeout5SecondsCallbacks = new Map();
    this.timeout10SecondsCallbacks = new Map();
  }

  public clearIntervals() {
    clearInterval(this.intervalId1Seconds);
    clearInterval(this.intervalId5Seconds);
    clearInterval(this.intervalId10Seconds);
  }

  private addEventListener(
    eventName: Event1Seconds['eventName'],
    callback: Event1Seconds['callback'],
  ): void;

  private addEventListener(
    eventName: Event5Seconds['eventName'],
    callback: Event5Seconds['callback'],
  ): void;

  private addEventListener(
    eventName: Event10Seconds['eventName'],
    callback: Event10Seconds['callback'],
  ): void;

  private addEventListener(eventName: string, callback: any) {
    const map: {
      [K in AnyEvent as K['eventName']]: (cb: K['callback']) => void;
    } = {
      '1-seconds': (cb) => {
        this.timeout1SecondsCallbacks.set(cb, cb);
      },
      '5-seconds': (cb) => {
        this.timeout5SecondsCallbacks.set(cb, cb);
      },
      '10-seconds': (cb) => {
        this.timeout10SecondsCallbacks.set(cb, cb);
      },
    };
    map[eventName]?.(callback as any);
  }

  private removeEventListener(
    eventName: Event1Seconds['eventName'],
    callback: Event1Seconds['callback'],
  ): void;

  private removeEventListener(
    eventName: Event5Seconds['eventName'],
    callback: Event5Seconds['callback'],
  ): void;

  private removeEventListener(
    eventName: Event10Seconds['eventName'],
    callback: Event10Seconds['callback'],
  ): void;

  private removeEventListener(eventName: string, callback: any) {
    const map: {
      [K in AnyEvent as K['eventName']]: (cb: K['callback']) => void;
    } = {
      '1-seconds': (cb) => {
        this.timeout1SecondsCallbacks.delete(cb);
      },
      '5-seconds': (cb) => {
        this.timeout5SecondsCallbacks.delete(cb);
      },
      '10-seconds': (cb) => {
        this.timeout10SecondsCallbacks.delete(cb);
      },
    };
    map[eventName]?.(callback as any);
  }

  public async waitOneSecondTimerTick() {
    return new Promise<void>((resolve) => {
      const cb = () => {
        resolve();
        this.removeEventListener('1-seconds', cb);
      };
      this.addEventListener('1-seconds', cb);
    });
  }

  public async waitFiveSecondsTimerTick() {
    return new Promise<void>((resolve) => {
      const cb = () => {
        resolve();
        this.removeEventListener('5-seconds', cb);
      };
      this.addEventListener('5-seconds', cb);
    });
  }

  public async waitTenSecondsTimerTick() {
    return new Promise<void>((resolve) => {
      const cb = () => {
        resolve();
        this.removeEventListener('10-seconds', cb);
      };
      this.addEventListener('10-seconds', cb);
    });
  }
}
