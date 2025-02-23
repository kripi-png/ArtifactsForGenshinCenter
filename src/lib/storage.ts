import { writable, type Updater, type Writable } from "svelte/store";
import type { UserArtifactData } from "../types";

/**
 * https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate/blob/454b7e446ab0e0d296bf113d179b570a129b71fe/src/storage.ts
 *
 * Creates a persistent Svelte store backed by Chrome's local storage.
 *
 * @template T The type of the store's value.
 * @param {string} key The key to use for the store in Chrome's local storage.
 * @param {T} initialValue The initial value of the store.
 * @returns {Writable<T>} A writable Svelte store.
 */

export function persistentStore<T>(key: string, initialValue: T): Writable<T> {
  const store = writable<T>(initialValue);

  function updateChromeStorage(value: T): void {
    browser.storage.local.set({ [key]: value });
  }

  function watchChromeStorage() {
    browser.storage.local.onChanged.addListener((changes) => {
      if (Object.hasOwn(changes, key)) {
        store.set(changes[key].newValue);
      }
    });
  }

  function initStoreFromChromeStorage() {
    browser.storage.local.get(key).then((result) => {
      if (Object.hasOwn(result, key)) {
        store.set(result[key]);
      }
    });
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
  "userArtifactStore",
  {
    __DISABLED: false,
    __VERSION: 1,
    characters: {},
  },
);
