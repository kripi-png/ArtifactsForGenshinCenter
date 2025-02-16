import { initializeArtifactUI } from "../lib/artifactManager";
import { updateLocalDataset } from "../lib/dataManager";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  runAt: "document_end",
  async main() {
    await updateLocalDataset();

    // if artifacts are not disabled:
    initializeArtifactUI();
  },
});
