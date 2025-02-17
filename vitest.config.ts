import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
  },
  plugins: [
    WxtVitest() as any,
    () => {
      console.log("plugin loaded");
    },
  ],
});
