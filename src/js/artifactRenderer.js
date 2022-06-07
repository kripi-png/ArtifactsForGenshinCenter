import { Slot } from './components/Slot.js';
import { ArtifactPopup } from './components/ArtifactPopup.js';
import { ArtifactEditor } from './components/ArtifactEditor.js';
import { ArtifactHidingButton } from './components/ArtifactHidingButton.js';

import {
  ARTIFACT_DATA,
  ARTIFACT_SET_NAMES,
  DATASET,
} from './dataManager.js';

const openArtifactEditor =  event => {
  const targetArtifactSlot = event.target;
  const artifactOwner = getArtifactSlotOwner(targetArtifactSlot).toLowerCase();
  const artifactType = getArtifactSlotType(targetArtifactSlot);

  const editWindow = ArtifactEditor(targetArtifactSlot, ARTIFACT_SET_NAMES,
                                            artifactOwner, artifactType);

  document.body.appendChild(editWindow);
};

// create all 5 artifact slots for a single {panel}
export const createSlotsForPanel = panel => {
  const wrapperDiv = document.createElement('div');
  // if character has space(s) in their name (e.g. Hu Tao) replace them with hypens
  wrapperDiv.dataset.character = panel.querySelector('.ItemPanel_itemName__jxpO4 > p').innerHTML.toLowerCase().replaceAll(' ', '-');
  wrapperDiv.classList.add('artifactSlotsWrapper');

  wrapperDiv.appendChild(Slot('flower', openArtifactEditor));
  wrapperDiv.appendChild(Slot('plume', openArtifactEditor));
  wrapperDiv.appendChild(Slot('sands', openArtifactEditor));
  wrapperDiv.appendChild(Slot('goblet', openArtifactEditor));
  wrapperDiv.appendChild(Slot('circlet', openArtifactEditor));

  panel.querySelector('.ItemPanel_itemContent__M9oCy').appendChild(wrapperDiv);
};

export const createHidingButton = panel => {
  // skip weapons
  if ( isWeapon(panel) ) return;
  // get owner's name to be stored into dataset for later
  // if character has space(s) in their name (e.g. Hu Tao) replace them with hyphens
  const character = panel
    .querySelector('.ItemPanel_itemName__jxpO4 > p').innerHTML
    .toLowerCase()
    .replaceAll(' ', '-');

  const disabled = panel
    .querySelector(`.artifactSlotsWrapper[data-character=${character}]`).classList
    .contains('disabled');

  const BUTTON_BAR = panel.querySelector('.ItemPanel_item__6lLWZ');
  const ACTIVE_BUTTON = BUTTON_BAR.querySelector('div[title=Active]');
  const HIDING_BUTTON = ArtifactHidingButton(disabled, character);
  // insert artifact hiding button before the active button
  BUTTON_BAR.insertBefore( HIDING_BUTTON, ACTIVE_BUTTON );
};

const createAllArtifactHidingButtons = () => {
  // call createHidingButton function with each panel as the value
  getAllCharacterPanels().forEach( createHidingButton );
};

export const loadAndCreateAllArtifacts = () => {
  createAllSlots();
  createAllArtifactHidingButtons();

  // if there is data for characters
  if ( Object.keys(ARTIFACT_DATA).length !== 0 ) {
    // loop through all characters
    Object.entries(ARTIFACT_DATA).forEach(
      ([character, charData]) => {
        // loop through all artifact pieces
        Object.entries(charData).forEach(
          ([piece]) => {
            loadArtifact(character, piece);
          }
        );
      }
    );
  }
};

// uses custom data attribute data-character to find
// and return a specific artifact slot of a character
export const getArtifactSlotByOwner = (character, slot) => {
  // fails e.g. when character has been removed but artifact data still exists
  try {
    // if character has space(s) in their name (e.g. Hu Tao) replace them with hypens
    return document
      .querySelector(`.artifactSlotsWrapper[data-character=${character.replaceAll(' ', '-')}]`)
      .querySelector(`.${slot}Slot`);
  } catch (e) {
    return false;
  }
};

export const loadArtifact = (character, slotType) => {
  const pieceIndex = { flower: 0, plume: 1, sands: 2, goblet: 3, circlet: 4 };

  // if artifacts are disabled for a character
  // add a class to the slot panel
  if (ARTIFACT_DATA[character]['disabled']) {
    const _slot = getArtifactSlotByOwner(character, 'plume');
    // optional chaining is not possible as it is
    // not currently supported by minifier APIs
    if (_slot.parentNode && _slot.parentNode.classList ) {
      _slot.parentNode.classList.add('disabled');
    }
  }

  const slot = getArtifactSlotByOwner(character, slotType);
  if (!slot) { return; }

  const type = getArtifactSlotType(slot);
  const set = ARTIFACT_DATA[character][type] ? ARTIFACT_DATA[character][type]['set'] : '';
  if (!set) { return; } // if no set is selected, abort

  const [piece, image] = DATASET[set][pieceIndex[type]];
  const main = ARTIFACT_DATA[character][type]['main'];
  const sub = ARTIFACT_DATA[character][type]['sub'];
  const check = ARTIFACT_DATA[character][type]['check'];

  slot.style.backgroundImage = `url(https://i.imgur.com/${image}.png)`;
  slot.dataset.set = set;
  slot.dataset.main = main;
  slot.dataset.sub = sub;
  slot.dataset.check = check;

  if (check) {
    slot.classList.add('check');
  } else {
    slot.classList.remove('check');
  }

  slot.onmouseover = e => createHoverPopup(e, slot, set, piece);
  slot.onmouseleave = () => {
    // wrapper_window is the the wrapper for the actual pop up
    const wrapper_window = document.querySelector('#artifactTooltipWindow');
    // parentNode is <body>
    wrapper_window.parentNode.removeChild(wrapper_window);
  };
};

const createHoverPopup = (event, slot, set, piece) => {
  const HOVER_POPUP = ArtifactPopup(slot, set, piece);
  document.body.appendChild(HOVER_POPUP);
};

// create artifact slot elements for each character
const createAllSlots = () => {
  getAllCharacterPanels().forEach( panel => createSlotsForPanel(panel) );
};

// remove artifacts and buttons
export const removeAllArtifacts = () => {
  [...document.querySelectorAll('.artifactSlotsWrapper')]
    .forEach( slots => slots.parentNode.removeChild(slots) );
  // remove all invidual disable buttons
  [...document.querySelectorAll('.HideArtifactsButton')]
    .forEach( buttons => buttons.parentNode.removeChild(buttons) );
};

export const getAllCharacterPanels = () => {
  return [...document.querySelector('.Farm_itemList__EgRFB').children]
    .filter( panel => !isWeapon(panel) );
};

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
const isWeapon = (panel) => {
  return panel
    .querySelector('.ItemPanel_itemImage__ndELA > div').style.backgroundImage
    .includes('weapons');
};

// returns the character name from the title element of a {slot}
const getArtifactSlotOwner = (slot) => {
  return slot.parentNode.parentNode.parentNode.querySelector('.ItemPanel_itemName__jxpO4 > p').innerHTML;
};

// returns the type (plume, sands) of the artifact in a slot
const getArtifactSlotType = (slot) => {
  return slot.classList.item(1).replace('Slot', '');
};
