/**
 * @author Kuitos
 * @since 2019-04-11
 */

import { noop } from 'lodash';

const rawWindowInterval = window.setInterval;
const rawWindowClearInterval = window.clearInterval;
const rawWindowTimeout = window.setTimeout;
const rawWindowClearTimout = window.clearTimeout;

export default function patch() {
  let timers: number[] = [];
  let intervals: number[] = [];

  window.clearInterval = (intervalId: number) => {
    intervals = intervals.filter(id => id !== intervalId);
    return rawWindowClearInterval(intervalId);
  };

  window.setInterval = (handler: Function, timeout?: number, ...args: any[]) => {
    const intervalId = rawWindowInterval(handler, timeout, ...args);
    intervals = [...intervals, intervalId];
    return intervalId;
  };

  window.clearTimeout = (timerId: number) => {
    timers = timers.filter(id => id !== timerId);
    return rawWindowClearTimout(timerId);
  };

  window.setTimeout = (handler: Function, timeout?: number, ...args: any[]) => {
    const timerId = rawWindowTimeout(
      () => {
        handler(...args);
        window.clearTimeout(timerId);
      },
      timeout,
      ...args,
    );
    timers = [...timers, timerId];
    return timerId;
  };

  return function free() {
    timers.forEach(id => window.clearTimeout(id));
    intervals.forEach(id => window.clearInterval(id));

    window.setInterval = rawWindowInterval;
    window.clearInterval = rawWindowClearInterval;
    window.setTimeout = rawWindowTimeout;
    window.clearTimeout = rawWindowClearTimout;

    return noop;
  };
}
