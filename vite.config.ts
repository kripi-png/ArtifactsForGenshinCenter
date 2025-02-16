/// <reference types="vitest" />

import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
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
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
  test: {
    setupFiles: ["./vitest.init.ts"],
  },
});
