// uses custom data attribute data-character to find
// and return a specific artifact slot of a character
export const getArtifactSlotByOwner = (character, slot) => {
  // fails e.g. when character has been removed but artifact data still exists
  try {
    // if character has space(s) in their name (e.g. Hu Tao) replace them with hypens
    return document
      .querySelector(
        `.artifactSlotsWrapper[data-character=${character.replaceAll(" ", "-")}]`,
      )
      .querySelector(`.${slot}Slot`);
  } catch (e) {
    return false;
  }
};

// remove artifacts and buttons
export const removeAllArtifacts = () => {
  [...document.querySelectorAll(".artifactSlotsWrapper")].forEach((slots) =>
    slots.parentNode.removeChild(slots),
  );
  // remove all invidual disable buttons
  [...document.querySelectorAll(".HideArtifactsButton")].forEach((buttons) =>
    buttons.parentNode.removeChild(buttons),
  );
};

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
export const isWeapon = (panel) => {
  return panel
    .querySelector(".ItemPanel_itemImage__ndELA > div")
    .style.backgroundImage.includes("weapons");
};
