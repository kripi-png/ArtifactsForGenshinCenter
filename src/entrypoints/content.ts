import { initializeArtifactUI } from "../lib/artifactManager";
import { updateLocalDataset } from "../lib/dataManager";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  async main(ctx) {
    await updateLocalDataset();

    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".Farm_itemList__EgRFB",
      onMount: (_container) => {
        initializeArtifactUI();
      },
    });

    // Call mount to add the UI to the DOM
    ui.autoMount();
  },
});
