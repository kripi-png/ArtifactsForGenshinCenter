import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "wxt";

export default defineConfig({
  // vite configs
  vite: () => ({
    plugins: [svelte() as any],
    test: {
      setupFiles: ["./vitest.init.ts"],
    },
  }),

  // wxt configs
  srcDir: "src",
  outDir: "dist",
  // extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    name: "Artifacts for Genshin Center",
    version: "2.0.0",
    description:
      "Plan which artifacts you want to get for your Genshin Impact character via this extension for Genshin Center's Ascension Planner.",
    permissions: ["storage"],
    icons: {
      128: "icon.png",
    },
    action: {
      default_title: "Go to Genshin Center",
      default_icon: {
        32: "icon.png",
      },
    },
    // host_permissions: ["*://*.example.com/*"],
  },
});
