import { mount } from "svelte";
import type { ContentScriptContext } from "wxt/client";
import ArtifactDisableButton from "../components/artifacts/ArtifactDisableButton.svelte";
import ArtifactSlotWrapper from "../components/artifacts/ArtifactSlotWrapper.svelte";
import { getAllArtifactSets } from "./dataManager";
import { MAIN_STAT_OPTIONS } from "@/constants";

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

export const generateMainStatDatalist = async () => {
  /*
  pre-generate the datalist for the main stat input of the artifact editor.
  The possible options are defined in src/constants.ts
  */

  const datalist = document.createElement("datalist");
  datalist.id = "mainStatOptions";

  MAIN_STAT_OPTIONS.forEach((value: string) => {
    const option = document.createElement("option");
    option.value = value;
    datalist.appendChild(option);
  });

  document.body.appendChild(datalist);
};

const createArtifactSlotsForPanel = (
  container: HTMLElement,
  characterName: string,
) => {
  mount(ArtifactSlotWrapper, {
    target: container,
    props: { characterName },
  });
};

const createArtifactHidingButtonForPanel = (
  container: HTMLElement,
  characterName: string,
) => {
  mount(ArtifactDisableButton, {
    target: container,
    props: { characterName },
  });
};

const getCharacterNameFromPanel = (panel: HTMLElement): string | undefined => {
  // character name in lowercase and hyphenated (e.g. Hu Tao -> hu-tao)
  const characterName = panel
    .querySelector("div.ItemPanel_itemName__jxpO4")
    ?.textContent?.toLowerCase()
    .replace(/\s+/g, "-");
  return characterName;
};

export const isPanelWeapon = (panel: HTMLElement): boolean => {
  // check if the panel's backgroundImage url has "weapons" in it
  // wrap in Boolean in the case of undefined
  return Boolean(
    panel
      .querySelector<HTMLElement>("div.ItemPanel_itemImage__ndELA > div")
      ?.style.backgroundImage.includes("weapons"),
  );
};

// function for creating the IntegratedUIs for the slots and button.
export const mountSlots = (ctx: ContentScriptContext, panel: HTMLElement) => {
  const characterName = getCharacterNameFromPanel(panel);
  if (!characterName) {
    console.error("Character name not found for panel", panel);
    return;
  }
  // create and mount artifactWrapper
  createIntegratedUi(ctx, {
    position: "inline",
    anchor: panel.querySelector("div.ItemPanel_itemContent__M9oCy"),
    onMount: (container) => {
      createArtifactSlotsForPanel(container, characterName);
    },
  }).mount();
  // create and mount the Disable button
  createIntegratedUi(ctx, {
    position: "inline",
    anchor: panel.querySelector(".ItemPanel_pauseButton__hI9FU"),
    append: "before",
    onMount: (container) => {
      createArtifactHidingButtonForPanel(container, characterName);
    },
  }).mount();
};

/**
 * Create a mutation observer that listens for character panels.
 * If new characters are added, create the slots for them.
 * Note: Initial setup is managed by IntegratedUI in the content script.
 * @param ctx Content script context from the content script
 * @returns {MutationObserver} mutation observer that listens for character panels
 */
export const generateCharacterObserver = (
  ctx: ContentScriptContext,
): MutationObserver => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const nodeList = [...mutation.addedNodes] as HTMLElement[];
        nodeList.forEach((node) => {
          if (
            node.firstElementChild?.classList?.contains(
              "ItemPanel_itemWrapper__BUn4_",
            )
          ) {
            const newPanel = node.querySelector(
              ".ItemPanel_item__6lLWZ",
            ) as HTMLElement | null;
            // observer triggers also when the characters are re-ordered
            // which would lead to duplicated artifact wrappers
            // thus check if the panel already has artifacts before mounting
            const hasArtifacts =
              newPanel?.querySelector(".artifactSlotWrapper") !== null;
            if (newPanel && !hasArtifacts) mountSlots(ctx, newPanel);
          }
        });
      }
    });
  });

  return observer;
};
