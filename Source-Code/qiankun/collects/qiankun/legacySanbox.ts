/**
 * @author Kuitos
 * @since 2019-04-11
 */
import { SandBox } from '../../interfaces';
import { isConstructable } from '../../utils';

function isPropConfigurable(target: object, prop: PropertyKey) {
  const descriptor = Object.getOwnPropertyDescriptor(target, prop);
  return descriptor ? descriptor.configurable : true;
}

function setWindowProp(prop: PropertyKey, value: any, toDelete?: boolean) {
  if (value === undefined && toDelete) {
    delete (window as any)[prop];
  } else if (isPropConfigurable(window, prop) && typeof prop !== 'symbol') {
    Object.defineProperty(window, prop, { writable: true, configurable: true });
    (window as any)[prop] = value;
  }
}

export default class SingularProxySandbox implements SandBox {
  private addedPropsMapInSandbox = new Map<PropertyKey, any>();

  private modifiedPropsOriginalValueMapInSandbox = new Map<PropertyKey, any>();

  private currentUpdatedPropsValueMap = new Map<PropertyKey, any>();

  name: string;

  proxy: WindowProxy;

  sandboxRunning = true;

  active() {
    if (!this.sandboxRunning) {
      this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v));
    }

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => setWindowProp(p, v));
    this.addedPropsMapInSandbox.forEach((_, p) => setWindowProp(p, undefined, true));

    this.sandboxRunning = false;
  }

  constructor(name: string) {
    this.name = name;
    const {
      sandboxRunning,
      addedPropsMapInSandbox,
      modifiedPropsOriginalValueMapInSandbox,
      currentUpdatedPropsValueMap,
    } = this;

    const boundValueSymbol = Symbol('bound value');
    const rawWindow = window;
    const fakeWindow = Object.create(null) as Window;
    const proxy = new Proxy(fakeWindow, {
      set(_: Window, p: PropertyKey, value: any): boolean {
        if (sandboxRunning) {
          if (!rawWindow.hasOwnProperty(p)) {
            addedPropsMapInSandbox.set(p, value);
          } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
            const originalValue = (rawWindow as any)[p];
            modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
          }

          currentUpdatedPropsValueMap.set(p, value);
          (rawWindow as any)[p] = value;
          return true;
        }
        return true;
      },

      get(_: Window, p: PropertyKey): any {
        if (p === 'top' || p === 'window' || p === 'self') {
          return proxy;
        }

        const value = (rawWindow as any)[p];
        if (typeof value === 'function' && !isConstructable(value)) {
          if (value[boundValueSymbol]) {
            return value[boundValueSymbol];
          }
          const boundValue = value.bind(rawWindow);
          Object.keys(value).forEach(key => (boundValue[key] = value[key]));
          Object.defineProperty(value, boundValueSymbol, { enumerable: false, value: boundValue });
          return boundValue;
        }

        return value;
      },

      has(_: Window, p: string | number | symbol): boolean {
        return p in rawWindow;
      },
    });

    this.proxy = proxy;
  }
}
