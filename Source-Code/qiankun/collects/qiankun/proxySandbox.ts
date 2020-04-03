/**
 * @author Kuitos
 * @since 2019-04-11
 */
import { uniq } from 'lodash';
import { SandBox } from '../interfaces';
import { isConstructable } from '../utils';

/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
  private updateValueMap = new Map<PropertyKey, any>();
  
  name: string;
  
  proxy: WindowProxy;
  
  sandboxRunning = true;
  
  active() {
    this.sandboxRunning = true;
  }
  inactive() {
    this.sandboxRunning = false;
  }

  constructor(name: string) {
    this.name = name;
    const { proxy, sandboxRunning, updateValueMap } = this;
    const boundValueSymbol = Symbol('bound value');
    const rawWindow = window;
    const fakeWindow = Object.create(null) as Window;

    this.proxy = new Proxy(fakeWindow, {
      set(_: Window, p: PropertyKey, value: any): boolean {
        if (sandboxRunning) {
          updateValueMap.set(p, value);
        }

        return true;
      },

      get(_: Window, p: PropertyKey): any {
        if (p === 'top' || p === 'window' || p === 'self') {
          return proxy;
        }

        const value = updateValueMap.get(p) || (rawWindow as any)[p];
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
        return updateValueMap.has(p) || p in rawWindow;
      },

      getOwnPropertyDescriptor(_: Window, p: string | number | symbol): PropertyDescriptor | undefined {
        if (updateValueMap.has(p)) {
          return { configurable: true, enumerable: true, value: updateValueMap.get(p) };
        }

        if ((rawWindow as any)[p]) {
          return Object.getOwnPropertyDescriptor(rawWindow, p);
        }

        return undefined;
      },

      ownKeys(): PropertyKey[] {
        return uniq([...Reflect.ownKeys(rawWindow), ...updateValueMap.keys()]);
      },

      deleteProperty(_: Window, p: string | number | symbol): boolean {
        if (updateValueMap.has(p)) {
          updateValueMap.delete(p);

          return true;
        }

        // 我想没人会删 window 上自有的属性吧？

        return false;
      },
    });
  }
}
