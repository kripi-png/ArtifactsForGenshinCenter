import { mount } from "svelte";
import type { ContentScriptContext } from "wxt/client";
import ArtifactDisableButton from "../components/ArtifactDisableButton.svelte";
import ArtifactSlotWrapper from "../components/ArtifactSlotWrapper.svelte";
import { getAllArtifactSets } from "./dataManager";

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

const createArtifactSlotsForPanel = (
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
 * If any characters are added afterwards, create an UI for those as well.
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

            // for each panel, except those of weapons, create and mount an integrated ui
            panels
              .filter((panel) => !isPanelWeapon(panel))
              .forEach((panel) => mountSlots(panel));
          }
          // if the element is a newly added character panel
          else if (
            (node as HTMLElement).firstElementChild?.classList?.contains(
              "ItemPanel_itemWrapper__BUn4_",
            )
          ) {
            const newPanel = (node as HTMLElement).querySelector(
              ".ItemPanel_item__6lLWZ",
            ) as HTMLElement | null;
            // observer triggers also when the characters are re-ordered
            // which would lead to duplicated artifact wrappers
            // thus check if the panel already has artifacts before mounting
            const hasArtifacts =
              newPanel?.querySelector(".artifactSlotWrapper") !== null;
            if (newPanel && !hasArtifacts) mountSlots(newPanel);
          }
        });
      }
    });
  });

  return observer;
};
