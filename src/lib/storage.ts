import { writable, type Updater, type Writable } from "svelte/store";
import type { UserArtifactData } from "../types";
import { migrateTo_2_0_0 } from "./migration";

type StorageKey =
  | `local:${string}`
  | `session:${string}`
  | `sync:${string}`
  | `managed:${string}`;

/**
 * https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate/blob/454b7e446ab0e0d296bf113d179b570a129b71fe/src/storage.ts
 *
 * Creates a persistent Svelte store backed by Chrome's local storage utilizing wxt/storage package.
 *
 * @template T The type of the store's value.
 * @param {StorageKey} key The key to use for the store in Chrome's storage. Must be prefixed with the storage area.
 * @param {T} initialValue The initial value of the store.
 * @returns {Writable<T>} A writable Svelte store.
 */
export function persistentStore<T>(
  key: StorageKey,
  initialValue: T,
): Writable<T> {
  const store = writable<T>(initialValue);
  const _userArtifactData = storage.defineItem<T>(key, {
    fallback: initialValue,
    version: 2,
    migrations: {
      2: async (data) => migrateTo_2_0_0(data),
    },
  });

  function updateChromeStorage(value: T) {
    _userArtifactData.setValue(value);
  }

  function watchChromeStorage() {
    _userArtifactData.watch((newData) => {
      store.set(newData);
    });
  }

  async function initStoreFromChromeStorage() {
    const data = await _userArtifactData.getValue();
    store.set(data);
  }

  initStoreFromChromeStorage();
  watchChromeStorage();

  return {
    set(this: void, value: T): void {
      store.set(value);
      updateChromeStorage(value);
    },
    update(this: void, updater: Updater<T>): void {
      return store.update((prev: T): T => {
        const value = updater(prev);
        updateChromeStorage(value);
        return value;
      });
    },
    subscribe: store.subscribe,
  };
}

export const userArtifactStore = persistentStore<UserArtifactData>(
  "local:userArtifactData",
  {
    __DISABLED: false,
    characters: {},
  },
);
