import { initializeArtifactUI } from "./artifactManager";
import { updateLocalDataset } from "./dataManager";

export const main = async () => {
  await updateLocalDataset();

  // if artifacts are not disabled:
  initializeArtifactUI();
};
