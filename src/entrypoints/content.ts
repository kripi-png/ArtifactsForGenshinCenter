import {
  createArtifactHidingButtonForPanel,
  createArtifactSlotsForPanel,
  getCharacterNameFromPanel,
  getCharacterPanels,
} from "@/lib/artifactManager";
import { getAllArtifactSets, updateLocalDataset } from "@/lib/dataManager";
import { mount } from "svelte";
import ExtensionSettings from "../components/ExtensionSettings.svelte";
import ModalBackdrop from "../components/modals/ModalsBackdrop.svelte";
import SidepanelOptions from "../components/SidepanelOptions.svelte";
import "../index.css";

export default defineContentScript({
  matches: ["https://genshin-center.com/planner"],
  async main(ctx) {
    await updateLocalDataset();

    // TODO: consider and try something like
    // createIntegratedUi(ctx, {
    //   anchor: ".Farm_itemList__EgRFB",
    //   onMount(cont => {
    //     cont
    //       .children.map(panel => createIntegratedUi({ anchor: panel }))
    //       .forEach(childUI => childUI.autoMount ());
    //   })
    // });

    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".Farm_itemList__EgRFB",
      onMount: (_container) => {
        main();
      },
    });

    // inject the modifications to the Settings Window
    // for example the Import / Export buttons
    const settingsInjection = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "#options .PlannerOptions_content__kBajJ",
      onMount: (container) => {
        mount(ExtensionSettings, {
          target: container,
        });
      },
    });

    // inject the modifications to the sidepanel options list
    const sidePanelOptions = createIntegratedUi(ctx, {
      position: "inline",
      anchor: ".PlannerOptions_optionContent__2_jPR",
      append: (anchor, ui) => {
        anchor.insertBefore(ui, anchor.lastElementChild);
        (ui as HTMLElement).style.width = "100%";
      },
      onMount: (container) => {
        mount(SidepanelOptions, {
          target: container,
        });
      },
    });

    // Call mount to add the UI to the DOM
    ui.autoMount();
    settingsInjection.autoMount();
    sidePanelOptions.autoMount();
  },
});

const main = async () => {
  // TODO: Do none of this if userArtifactStore.__DISABLED === true

  mount(ModalBackdrop, {
    target: document.body,
  });

  // temporarily open the settings panel on reload for convenience
  // const openSettings: HTMLElement = document.querySelector(
  //   "div.Farm_farm__uhRH4 > div.Farm_divider__XPwtq div.PlannerOptions_options__t3nvI div > h4",
  // ) as HTMLElement;
  // openSettings.click();

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
