/**
 * @author Kuitos
 * @since 2019-04-11
 */
import { Freer, Rebuilder, SandBox } from '../interfaces';
import { patchAtBootstrapping, patchAtMounting } from './patchers';
import LegacySandbox from './legacy/sandbox';
import ProxySandbox from './proxySandbox';
import SnapshotSandbox from './snapshotSandbox';

export function genSandbox(appName: string, singular: boolean) {
  let mountingFreers: Freer[] = [];
  let sideEffectsRebuilders: Rebuilder[] = [];

  let sandbox: SandBox;
  if (window.Proxy) {
    sandbox = singular ? new LegacySandbox(appName) : new ProxySandbox(appName);
  } else {
    sandbox = new SnapshotSandbox(appName);
  }

  return {
    sandbox: sandbox.proxy,

    async mount() {
      sandbox.active();
      mountingFreers = patchAtMounting(appName, sandbox.proxy);
      if (sideEffectsRebuildersAtMounting.length) {
        sideEffectsRebuildersAtMounting.forEach(rebuild => rebuild());
      }
      sideEffectsRebuilders = [];
    },

    async unmount() {
      sideEffectsRebuilders = [...bootstrappingFreers, ...mountingFreers].map(free => free());
      sandbox.inactive();
    },
  };
}
