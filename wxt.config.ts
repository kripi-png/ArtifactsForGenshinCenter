import { defineConfig } from "wxt";

export default defineConfig({
  // wxt configs
  srcDir: "src",
  outDir: "dist",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    name: "Genshin Impact Artifact Planner for Genshin Center",
    version: "2.1.0",
    description:
      "Track and plan artifacts for your Genshin Impact characters on Genshin Center.",
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
  },
});
