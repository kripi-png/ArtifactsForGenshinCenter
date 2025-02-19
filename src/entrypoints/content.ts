import {
  createArtifactHidingButtonForPanel,
  createArtifactSlotsForPanel,
  getCharacterNameFromPanel,
  getCharacterPanels,
} from "@/lib/artifactManager";
import { getAllArtifactSets } from "@/lib/dataManager";
import { mount } from "svelte";
import ModalBackdrop from "../components/editor/ModalsBackdrop.svelte";
import { updateLocalDataset } from "../lib/dataManager";

import "../index.css";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  async main(ctx) {
    await updateLocalDataset();

    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".Farm_itemList__EgRFB",
      onMount: (_container) => {
        main();
      },
    });

    // Call mount to add the UI to the DOM
    ui.autoMount();
  },
});

const main = async () => {
  mount(ModalBackdrop, {
    target: document.body,
  });

  /* pre-generate the datalist for the editor dropdown */
  const artifactSets = await getAllArtifactSets();
  const datalist = document.createElement("datalist");
  datalist.id = "artifactSelectorDatalist";
  artifactSets.forEach((setName: string) => {
    const option = document.createElement("option");
    option.value = setName;
    datalist.appendChild(option);
  });
  document.body.appendChild(datalist);

  /* inject the artifacts and other UI to the character panels */
  const panels = getCharacterPanels();
  panels.forEach((panel) => {
    const characterName = getCharacterNameFromPanel(panel);
    if (!characterName) {
      console.error("Character name not found for panel", panel);
      return;
    }
    createArtifactSlotsForPanel(panel, characterName);
    createArtifactHidingButtonForPanel(panel, characterName);
  });
};
