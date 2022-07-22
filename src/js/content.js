import { ExportImportSection } from './components/ExportImportSection.js';
import { ExtensionSettingsSection } from './components/ExtensionSettingsSection.js';

import {
  DATASET,
  ARTIFACT_DATA,
  loadArtifactData,
} from './dataManager.js';

import {
  isWeapon,
  loadArtifact,
  createHidingButton,
  createSlotsForPanel,
  getArtifactSlotByOwner,
  loadAndCreateAllArtifacts,
} from './artifactRenderer.js';

const main = async () => {
  await loadArtifactData();
  // console.log(DATASET);
  // console.log(ARTIFACT_DATA);

  // do not create the slots or the hiding buttons if artifacts are disabled
  if ( ARTIFACT_DATA['__DISABLED'] === false ) {
    loadAndCreateAllArtifacts();
  }

  // mutation observer cannot track elements created before
  // it's been initialized so the function must be called once on startup
  const OPTIONS_MENU = document.querySelector('.PlannerOptions_options__t3nvI');
  const OPTIONS_SECTION_LIST = OPTIONS_MENU.querySelector('.PlannerOptions_optionContent__2_jPR');
  const SETTINGS_SECTION = ExtensionSettingsSection();
  // last element is the More Options button
  OPTIONS_SECTION_LIST.insertBefore(SETTINGS_SECTION, OPTIONS_SECTION_LIST.lastElementChild);

  // MutationObserver is used to monitor when
  // a) the user opens the options window
  // b) the quick menu is created on screens wide enough (laptop and wider)
  // c) user adds a new character
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  const observer = new MutationObserver( mutationList => {
    mutationList.forEach( mutation => {
      mutation.addedNodes.forEach( addedNode => {
        // options window
        // console.log(addedNode);
        // console.log(addedNode.classList);
        if ( addedNode.id === 'options' ) {
          const options_window = addedNode;
          options_window
            .querySelector('.PlannerOptions_content__kBajJ')
            .appendChild(ExportImportSection());
        }
        // quick menu
        else if ( addedNode.classList.contains('PlannerOptions_options__t3nvI')) {
          // OPTIONS_MENU element does not exist until
          // quick menu is created thus it has to be (re)defined here
          const OPTIONS_MENU = document.querySelector('.PlannerOptions_options__t3nvI');
          const OPTIONS_SECTION_LIST = OPTIONS_MENU.querySelector('.PlannerOptions_optionContent__2_jPR');
          const SETTINGS_SECTION = ExtensionSettingsSection();
          // last element is the More Options button
          OPTIONS_SECTION_LIST.insertBefore(SETTINGS_SECTION, OPTIONS_SECTION_LIST.lastElementChild);
        }
        // new character
        else if ( !addedNode.id && addedNode.firstElementChild?.classList.contains('ItemPanel_itemWrapper__BUn4_')) {
          const CHAR_PANEL = addedNode.firstElementChild;
          // get name of added character
          const charName = CHAR_PANEL.querySelector('.ItemPanel_itemName__jxpO4 > p').innerHTML.toLowerCase();

          // reordering characters also triggers this function so prevent it
          // getArtifactSlotByOwner returns false if slot does not exist which means it's a new character
          if ( getArtifactSlotByOwner(charName, 'plume') ) { return; }
          // skip weapons
          if ( isWeapon(CHAR_PANEL) ) { return; }

          createSlotsForPanel(CHAR_PANEL);
          createHidingButton(CHAR_PANEL);

          // if character has no artifact data, return
          if ( !Object.keys(ARTIFACT_DATA).includes(charName) ) { return; }

          // find character's artifact data
          // entry == ['name', {plume: {set: xxx, main: yyy}, circlet: {set: zzz, }, ...}]
          // thus, entry[0] refers to the name of the character, and entry[1] to the data
          const charData = Object.entries(ARTIFACT_DATA).find( entry => entry[0] === charName )[1];

          Object.entries(charData).forEach(
            ([piece]) => {
              loadArtifact(charName, piece);
            }
          );
        }
      });
    });
  });

  const config = { subtree: false, childList: true };
  // options window, opened manually
  observer.observe(document.querySelector('body'), config);
  // quick menu, accessible only on screens wide enough
  observer.observe(document.querySelector('.Farm_sideBar__yXGVR'), config);
  // observe for new character panels
  observer.observe(document.querySelector('.Farm_itemList__EgRFB'), config);
};

// waits until the character list has loaded and then executes the main function
// called from content_script.js
export function waitForPageToLoad () {
  const waitForCharacterList = setInterval(function () {
    if ( document.querySelector('.Farm_itemList__EgRFB > div') ) {
      clearInterval(waitForCharacterList);
      console.log("Character list loaded!");

      main();
    }
  }, 100);
}
