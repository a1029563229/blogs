/**
 * @author Hydrogen
 * @since 2020-3-8
 */
import { SandBox } from '../interfaces';

function iter(obj: object, callbackFn: (prop: any) => void) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop);
    }
  }
}

export default class SnapshotSandbox implements SandBox {
  proxy: WindowProxy;

  name: string;

  sandboxRunning = false;

  private windowSnapshot!: Window;

  private modifyPropsMap: Record<any, any> = {};

  constructor(name: string) {
    this.name = name;
    this.proxy = window;
    this.active();
  }

  active() {
    if (this.sandboxRunning) {
      return;
    }

    this.windowSnapshot = {} as Window;
    iter(window, prop => {
      this.windowSnapshot[prop] = window[prop];
    });

    Object.keys(this.modifyPropsMap).forEach((p: any) => {
      window[p] = this.modifyPropsMap[p];
    });

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifyPropsMap = {};

    iter(window, prop => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.info(`[qiankun:sandbox] ${this.name} origin window restore...`, Object.keys(this.modifyPropsMap));
    }

    this.sandboxRunning = false;
  }
}
