import {
  createSlot,
  createArtifactEditor,
  createTooltipBoxWrapper,
  createArtifactHidingButton,
  addExportImportToOptionsWindow,
  createShowAllArtifactCheckbox,
} from './elementManager.js';

const DATASET = await getDataset();
const ARTIFACT_SET_NAMES = Object.keys(DATASET);
const ARTIFACT_DATA = await loadFromStorage('userArtifactData') || {};

// used for the Show all artifacts checkbox in options menu
const CHECKBOX_VALUES = {
  on: '32.526912689208984px 32.526912689208984px',
  off: '0px 32.526912689208984px'
};

// define __DISABLED attribute if not done previously
// used to disabled/enable ALL artifacts, toggled via checkbox in options menu
if ( !ARTIFACT_DATA['__DISABLED'] ) {
  ARTIFACT_DATA['__DISABLED'] = false;
}

const main = function () {
  console.log(DATASET);
  console.log(ARTIFACT_DATA);

  // do not create the slots or the hiding buttons if artifacts are disabled
  if ( ARTIFACT_DATA['__DISABLED'] === false ) {
    loadAndCreateAllArtifacts();
  }

  // get option menu list element and append the section for the checkbox
  const options_menu = document.querySelector('.PlannerOptions_optionContent__1ZN2G');
  // currentMode is used to set the initial state
  const currentMode = ARTIFACT_DATA['__DISABLED']
                        ? CHECKBOX_VALUES.off
                        : CHECKBOX_VALUES.on;
  createShowAllArtifactCheckbox(options_menu, hideAllArtifactsToggle, currentMode);

  // the options window element does not exist before the user
  // presses the More Options button, thus we listen for changes in the DOM
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  const observer = new MutationObserver( mutationList => {
    mutationList.forEach( mutation => {
      mutation.addedNodes.forEach( addedNode => {
        if ( addedNode.id === 'options') {
          addExportImportToOptionsWindow(addedNode, importArtifactData, exportArtifactData);
        }
      });
    });
  });

  observer.observe(document.querySelector('body'), { subtree: false, childList: true });
};

// create all slots and buttons for hiding artifacts of a single character
// loop through user's save data and load artifacts
const loadAndCreateAllArtifacts = function () {
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

// remove artifacts and buttons
const removeAllArtifacts = function () {
  [...document.querySelectorAll('.artifactSlotsWrapper')]
    .forEach( slots => slots.parentNode.removeChild(slots) );
  // remove all invidual disable buttons
  [...document.querySelectorAll('.ItemPanel_buttonWrapper__T2Pof[title="Hide Artifacts"]')]
    .forEach( buttons => buttons.parentNode.removeChild(buttons) );
};

// callback for toggling visibility when the setting is un/checked
const hideAllArtifactsToggle = function () {
  const checkbox_element = document.querySelector('#toggleVisibilityCheckboxPath');
  const checkbox_current = checkbox_element.getAttribute('stroke-dasharray');

  // toggle the check mark
  // unfortunately the animation would (probably) be quite hard to implement
  if ( checkbox_current === CHECKBOX_VALUES.on ) {
    // hide artifact
    checkbox_element.setAttribute('stroke-dasharray', CHECKBOX_VALUES.off);
    ARTIFACT_DATA['__DISABLED'] = true;
    removeAllArtifacts();
  } else {
    // show artifacts
    checkbox_element.setAttribute('stroke-dasharray', CHECKBOX_VALUES.on);
    ARTIFACT_DATA['__DISABLED'] = false;
    loadAndCreateAllArtifacts();
  }

  saveToStorage('userArtifactData', ARTIFACT_DATA);
};

const importArtifactData = function () {
  let data = window.prompt("Copy and paste the data here:");
  // if user presses cancel
  if ( data === null ) { return; }

  try {
    // if the field is empty, go to catch
    if (!data) { throw Error; }

    data = JSON.parse(data);
    console.log("data is valid");
    console.log(data);

    // cancel if user does not type "sure"
    const confirmation = window.prompt("Note: This will override all previous artifacts! Type CONFIRM to continue.").toLowerCase() === 'confirm';
    if (!confirmation) { return; }

    // override previous artifacts in the local storage, then reload the page
    saveToStorage('userArtifactData', data);
    window.alert("Artifact data imported! The webpage will now reload.");
    window.location.reload();
  } catch (e) {
    // if any errors were encountered, inform the user and recall the function
    window.alert("Invalid data! Try again.");
    importArtifactData();
  }
};

const exportArtifactData = function () {
  const data = JSON.stringify(ARTIFACT_DATA);
  window.prompt("Copy and paste this to a text file:", data);
};

// create artifact slot elements for each character
const createAllSlots = function () {
  getAllCharacterPanels().forEach( panel => createSlotsForPanel(panel) );
};

// create all 5 artifact slots for a single {panel}
const createSlotsForPanel = function (panel) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.dataset.character = panel.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML.toLowerCase().replaceAll(' ', '-');
  wrapperDiv.classList.add('artifactSlotsWrapper');

  const flowerSlot = createSlot('flower', openArtifactEditor);
    wrapperDiv.appendChild(flowerSlot);
  const plumeSlot = createSlot('plume', openArtifactEditor);
    wrapperDiv.appendChild(plumeSlot);
  const sandsSlot = createSlot('sands', openArtifactEditor);
    wrapperDiv.appendChild(sandsSlot);
  const gobletSlot = createSlot('goblet', openArtifactEditor);
    wrapperDiv.appendChild(gobletSlot);
  const circletSlot = createSlot('circlet', openArtifactEditor);
    wrapperDiv.appendChild(circletSlot);

  panel.querySelector('.ItemPanel_itemContent__1D5XB').appendChild(wrapperDiv);
};

const openArtifactEditor = function (event) {
  const targetArtifactSlot = event.target;
  const artifactOwner = getArtifactSlotOwner(targetArtifactSlot).toLowerCase();
  const artifactType = getArtifactSlotType(targetArtifactSlot);

  const editWindow = createArtifactEditor(targetArtifactSlot, ARTIFACT_SET_NAMES,
                                            artifactOwner, artifactType,
                                            confirmArtifactEdit, deleteArtifact);

  document.body.appendChild(editWindow);
};

const confirmArtifactEdit = function (event, owner, type) {
  const set = document.querySelector('#selectArtifactInput').value;
  const main = document.querySelector('#artifactMainStat').value;
  const sub = document.querySelector('#artifactSubStat').value;
  const check = document.querySelector('#artifactCheckbox').checked;

  if (!ARTIFACT_DATA[owner]) { ARTIFACT_DATA[owner] = {}; }
  ARTIFACT_DATA[owner][type] = { set: set, main: main, sub: sub, check: check };

  saveToStorage('userArtifactData', ARTIFACT_DATA);
  loadArtifact(owner, type);

  const editor = document.querySelector('#artifactEdit');
  editor.parentNode.removeChild(editor); // delete the editor element once artifact is selected
};

const deleteArtifact = function (event, owner, type) {
  if (ARTIFACT_DATA[owner]) {
    delete ARTIFACT_DATA[owner][type];
  }

  const slot = getArtifactSlotByOwner(owner, type);
  if (!slot) { return; }

  slot.dataset.set = '';
  slot.dataset.main = '';
  slot.dataset.sub = '';
  slot.dataset.check = '';
  slot.style.backgroundImage = '';
  slot.classList.remove('check');

  slot.onmouseover = () => false;
  slot.onmouseleave = () => false;

  console.log(ARTIFACT_DATA[owner]);

  saveToStorage('userArtifactData', ARTIFACT_DATA);
  loadArtifact(owner, type);

  const editor = document.querySelector('#artifactEdit');
  editor.parentNode.removeChild(editor); // delete the editor element once artifact is selected
};

const loadArtifact = function (character, slot) {
  const pieceIndex = { flower: 0, plume: 1, sands: 2, goblet: 3, circlet: 4 };

  // OPTIMIZE: disabling is now done for every piece
  // disabling has to be done here because if character has no artifacts
  // slot is only ever 'disabled' (aloy: { disabled: true })
  // and function thus returns because no such slot exist
  if (ARTIFACT_DATA[character]['disabled']) {
    // optional chaining in case disabled panels are hidden
    getArtifactSlotByOwner(character, 'plume')?.parentNode?.classList.add('disabled');
  }

  slot = getArtifactSlotByOwner(character, slot);
  if (!slot) { return; }

  const type = getArtifactSlotType(slot);
  const set = ARTIFACT_DATA[character][type] ? ARTIFACT_DATA[character][type]['set'] : '';
  if (!set) { return; } // if no set is selected, abort
  const piece = DATASET[set][pieceIndex[type]][0];

  const image = DATASET[set][pieceIndex[type]][1];
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

const createAllArtifactHidingButtons = function () {
  getAllCharacterPanels().forEach( panel => {
    // get owner's name to be stored into dataset for later
    const owner = panel.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML.toLowerCase().replaceAll(' ', '-');
    createArtifactHidingButton(panel, owner, hidingButtonCallback);
  });
};

const hidingButtonCallback = function (e) {
  // e.target is div.CircleButton_inner__2223j so get the div element
  const button = e.target.parentNode.parentNode;
  // find the artifact slot wrapper by the character name stored in the button div element
  const slotWrapper = document.querySelector(`.artifactSlotsWrapper[data-character=${e.target.parentNode.parentNode.dataset.character}]`);
  // ARTIFACT_DATA doesn't use hypens in character names (yet) so replace them
  hideArtifacts(button, slotWrapper, button.dataset.character.replaceAll('-', ' '));
};

const hideArtifacts = function (button, slotWrapper, character) {
  if (slotWrapper.classList.contains('disabled')) {
    button.title = "Hide Artifacts";
  } else {
    button.title = "Show Artifacts";
  }
  slotWrapper.classList.toggle('disabled');

  // make sure object for character exists
  if (!ARTIFACT_DATA[character]) { ARTIFACT_DATA[character] = { disabled: false }; }
  ARTIFACT_DATA[character]['disabled'] = !ARTIFACT_DATA[character]['disabled'];

  saveToStorage('userArtifactData', ARTIFACT_DATA);
};

const createHoverPopup = function (event, slot, set, piece) {
  const { x, y } = calculatePopupLocation(slot);

  const tooltipBox = createTooltipBoxWrapper(slot, x, y, set, piece);
  document.body.appendChild(tooltipBox);
};

function saveToStorage (name, data) {
  chrome.storage.local.set({ [name]: JSON.stringify(data) });
}

function loadFromStorage (name) {
  // chrome.storage.local.get cannot return anything unless
  // it is wrapped inside a promise
  return new Promise( resolve => {
    chrome.storage.local.get([name], result => {
      // if user uses the extension for the first time
      // key doesn't exist and the extension would crash
      if (!result[name]) {
        resolve(false);
        return;
      }

      resolve(JSON.parse(result[name]));
    });
  });
}

// returns the character name from the title element of a {slot}
const getArtifactSlotOwner = function (slot) {
  return slot.parentNode.parentNode.parentNode.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML;
};

// returns the type (plume, sands) of the artifact in a slot
const getArtifactSlotType = function (slot) {
  return slot.classList.item(1).replace('Slot', '');
};

const getAllCharacterPanels = function () {
  return [...document.querySelector('.Farm_itemList__zk7_j').children].filter( panel => !isWeapon(panel) );
};

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
const isWeapon = function (panel) {
  return panel.querySelector('.ItemPanel_itemImage__2fZwL > img').src.includes('weapons');
};

// uses custom data attribute data-character to find
// and return a specific artifact slot of a character
const getArtifactSlotByOwner = function (character, slot) {
  // fails e.g. when character has been removed but artifact data still exists
  try {
    return document.querySelector(`.artifactSlotsWrapper[data-character=${character.replaceAll(' ', '-')}]`).querySelector(`.${slot}Slot`);
  } catch (e) {
    return false;
  }
};

// calculates the location of the hover pop up in relation to the hovered slot
const calculatePopupLocation = function (slot) {
  const rect = slot.getBoundingClientRect();

  const x = rect.left + slot.getBoundingClientRect().width;
  const y = rect.bottom - rect.height;

  return { x, y };
};

async function getDataset () {
  const DATASET = await fetch(chrome.runtime.getURL('src/js/dataset.json'));
  return DATASET.json();
}

// waits until the character list has loaded and then executes the main function
// called from content_script.js
export function waitForPageToLoad () {
  const waitForCharacterList = setInterval(function () {
    if ( document.querySelector('.Farm_itemList__zk7_j > div') ) {
      clearInterval(waitForCharacterList);
      console.log("Character list loaded!");

      main();
    }
  }, 100);
}
