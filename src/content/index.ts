import type { DatasetData } from "../types";
import { initializeArtifactUI } from "./artifactManager";
import { updateLocalDataset, getLocalDataset } from "./dataManager";

export const main = async () => {
  await updateLocalDataset();
  // getLocalDataset().then((dataset) => console.log("dataset", dataset));
  //
  // if artifacts are not disabled:
  initializeArtifactUI();
};
