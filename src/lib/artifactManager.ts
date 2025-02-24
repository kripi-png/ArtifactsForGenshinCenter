import { mount } from "svelte";
import type { ContentScriptContext } from "wxt/client";
import ArtifactDisableButton from "../components/ArtifactDisableButton.svelte";
import ArtifactSlotWrapper from "../components/ArtifactSlotWrapper.svelte";
import { getAllArtifactSets } from "./dataManager";

export const createArtifactSlotsForPanel = (
  container: HTMLElement,
  characterName: string,
) => {
  mount(ArtifactSlotWrapper, {
    target: container,
    props: {
      characterName,
    },
  });
};

export const createArtifactHidingButtonForPanel = (
  container: HTMLElement,
  characterName: string,
) => {
  mount(ArtifactDisableButton, {
    target: container,
    props: { characterName },
  });
};

export const generateArtifactDatalist = async () => {
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
};

export const getCharacterNameFromPanel = (
  panel: HTMLElement,
): string | undefined => {
  // character name in lowercase and hyphenated (e.g. Hu Tao -> hu-tao)
  const characterName = panel
    .querySelector("div.ItemPanel_itemName__jxpO4")
    ?.textContent?.toLowerCase()
    .replace(/\s+/g, "-");
  return characterName;
};

export const getCharacterPanels = (): HTMLElement[] => {
  const panels = [
    ...document.querySelectorAll<HTMLElement>("div.ItemPanel_item__6lLWZ"),
  ].filter((panel) => !isPanelWeapon(panel));
  return panels;
};

const isPanelWeapon = (panel: HTMLElement): boolean => {
  // check if the panel's backgroundImage url has "weapons" in it
  // wrap in Boolean in the case of undefined
  return Boolean(
    panel
      .querySelector<HTMLElement>("div.ItemPanel_itemImage__ndELA > div")
      ?.style.backgroundImage.includes("weapons"),
  );
};

/**
 * Create a mutation observer that listens for character panels.
 * When the extension loads for the first time, generate an Integrated UI for all existing panels.
 * @param ctx Content script context from the content script
 * @returns {MutationObserver} mutation observer that listens for character panels
 */
export const generateCharacterObserver = (
  ctx: ContentScriptContext,
): MutationObserver => {
  const mountSlots = (panel: HTMLElement) => {
    const characterName = getCharacterNameFromPanel(panel);
    if (!characterName) {
      console.error("Character name not found for panel", panel);
      return;
    }
    // create and mount artifactWrapper and disabling button
    createIntegratedUi(ctx, {
      position: "inline",
      anchor: panel.querySelector("div.ItemPanel_itemContent__M9oCy"),
      onMount: (container) => {
        createArtifactSlotsForPanel(container, characterName);
      },
    }).mount();
    createIntegratedUi(ctx, {
      position: "inline",
      anchor: panel.querySelector(".ItemPanel_pauseButton__hI9FU"),
      append: "before",
      onMount: (container) => {
        createArtifactHidingButtonForPanel(container, characterName);
      },
    }).mount();
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if ((node as HTMLElement).classList?.contains("Farm_farm__uhRH4")) {
            // find all characrer panels
            const panels: HTMLElement[] = [
              ...(node as HTMLElement).querySelectorAll(
                ".ItemPanel_item__6lLWZ",
              ),
            ] as HTMLElement[];

            console.log(panels);
            // for each panel, create and mount an integrated ui
            panels.forEach((panel) => mountSlots(panel));
          } else if (false) {
            // if new character is added
          }
        });
      }
    });
  });

  return observer;
};
