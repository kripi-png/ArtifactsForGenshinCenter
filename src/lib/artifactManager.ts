import { mount } from "svelte";
import ModalBackdrop from "../components/ModalsBackdrop.svelte";
import ArtifactSlotWrapper from "../components/ArtifactSlotWrapper.svelte";

export const initializeArtifactUI = () => {
  // TODO: add some better listener, e.g. setInterval to check for an element on page
  const x = setTimeout(() => {
    mount(ModalBackdrop, {
      target: document.body,
    });

    const panels = getCharacterPanels();
    panels.forEach((panel) => {
      createArtifactSlotsForPanel(panel);
      // createArtifactHidingButtonForPanel(panel);
    });
    clearTimeout(x);
  }, 2000);
};

const createArtifactSlotsForPanel = (panel: HTMLElement) => {
  // character name in lowercase and hyphenated (e.g. Hu Tao -> hu-tao)
  const charName = panel
    .querySelector("div.ItemPanel_itemName__jxpO4")
    ?.textContent?.toLowerCase()
    .replace(/\s+/g, "-");

  if (!charName)
    return console.error("Character name not found for panel", panel);

  const contentWrapper = panel.querySelector(
    "div.ItemPanel_itemContent__M9oCy",
  ) as HTMLElement;

  mount(ArtifactSlotWrapper, {
    target: contentWrapper,
    props: {
      charName,
    },
  });
};

const getCharacterPanels = (): HTMLElement[] => {
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
