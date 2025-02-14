import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "Artifacts for Genshin Center",
  description:
    "Plan which artifacts you want to get for your Genshin Impact character via this extension for Genshin Center's Ascension Planner.",
  version: version,
  icons: {
    128: "src/images/icon.png",
  },
  web_accessible_resources: [
    {
      resources: ["src/js/content.js", "src/dataset.json"],
      matches: ["https://genshin-center.com/*"],
    },
  ],
  action: {
    default_title: "Go to Genshin Center",
    default_icon: {
      32: "src/images/icon.png",
    },
  },
  content_scripts: [
    {
      matches: ["https://genshin-center.com/planner"],
      js: ["src/js/content.js"],
      run_at: "document_end",
    },
  ],
  background: {
    service_worker: "src/background.js",
  },
  permissions: ["storage"],
}));
