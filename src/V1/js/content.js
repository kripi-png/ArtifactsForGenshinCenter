import { getArtifactSlotByOwner, isWeapon } from "./artifactRenderer.js";

export const main = async () => {
  // MutationObserver is used to monitor when
  // c) user adds a new character
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        // new character
        if (
          !addedNode.id &&
          addedNode.firstElementChild?.classList.contains(
            "ItemPanel_itemWrapper__BUn4_",
          )
        ) {
          const CHAR_PANEL = addedNode.firstElementChild;
          // get name of added character
          const charName = CHAR_PANEL.querySelector(
            ".ItemPanel_itemName__jxpO4 > p",
          ).innerHTML.toLowerCase();

          // reordering characters also triggers this function so prevent it
          // getArtifactSlotByOwner returns false if slot does not exist which means it's a new character
          if (getArtifactSlotByOwner(charName, "plume")) {
            return;
          }
          // skip weapons
          if (isWeapon(CHAR_PANEL)) {
            return;
          }

          createHidingButton(CHAR_PANEL);

          // if character has no artifact data, return
          if (!Object.keys(ARTIFACT_DATA).includes(charName)) {
            return;
          }

          // find character's artifact data
          // entry == ['name', {plume: {set: xxx, main: yyy}, circlet: {set: zzz, }, ...}]
          // thus, entry[0] refers to the name of the character, and entry[1] to the data
          const charData = Object.entries(ARTIFACT_DATA).find(
            (entry) => entry[0] === charName,
          )[1];

          Object.entries(charData).forEach(([piece]) => {
            loadArtifact(charName, piece);
          });
        }
      });
    });
  });

  const config = { subtree: false, childList: true };
  // options window, opened manually
  observer.observe(document.querySelector("body"), config);
  // quick menu, accessible only on screens wide enough
  observer.observe(document.querySelector(".Farm_sideBar__yXGVR"), config);
  // observe for new character panels
  observer.observe(document.querySelector(".Farm_itemList__EgRFB"), config);
};
