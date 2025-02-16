/// <reference types="vitest" />

import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import manifest from "./src/manifest.config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  legacy: {
    skipWebSocketTokenCheck: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
    cors: {
      origin: ["chrome-extension://eglgjmiagigeejlanegodabogbmdomfk"],
    },
  },
  test: {
    setupFiles: ["./vitest.init.ts"],
  },
});
