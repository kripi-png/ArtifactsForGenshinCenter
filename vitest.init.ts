import { vitest } from "vitest";

import dataset from "./src/dataset.json";
const localStorage = { dataset };

(globalThis as any).chrome = {
  storage: {
    local: {
      set: () => {
        throw new Error("Not implemented");
      },
      get: ((names: string[] | string, callback: Function) => {
        if (typeof names === "string") {
          return callback({ [names]: localStorage[names] });
        } else if (Array.isArray(names)) {
          const resultObj = {};
          names.forEach((name) => (resultObj[name] = localStorage[name] ?? {}));
          return callback(resultObj);
        }

        return callback({});
      }) as {
        (names: string, callback: Function): {};
        (names: string[], callback: Function): {};
      },
    },
  },
};
