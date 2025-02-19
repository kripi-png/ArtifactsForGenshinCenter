import { mount } from "svelte";
import ArtifactSlotWrapper from "../components/ArtifactSlotWrapper.svelte";

export const createArtifactSlotsForPanel = (panel: HTMLElement) => {
  // character name in lowercase and hyphenated (e.g. Hu Tao -> hu-tao)
  const characterName = panel
    .querySelector("div.ItemPanel_itemName__jxpO4")
    ?.textContent?.toLowerCase()
    .replace(/\s+/g, "-");

  if (!characterName)
    return console.error("Character name not found for panel", panel);

  const contentWrapper = panel.querySelector(
    "div.ItemPanel_itemContent__M9oCy",
  ) as HTMLElement;

  mount(ArtifactSlotWrapper, {
    target: contentWrapper,
    props: {
      characterName,
    },
  });
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
