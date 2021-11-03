import { createSlot, createArtifactEditor, createTooltipBoxWrapper } from './elementManager.js';

const ARTIFACT_DATA = loadFromCookies('userArtifactData') || {};
const DATASET = await getDataset();
console.log(DATASET);

const ARTIFACT_SET_NAMES = Object.keys(DATASET);

const main = function () {
  createAllSlots();

  console.log(ARTIFACT_DATA);

  if ( Object.keys(ARTIFACT_DATA).length != 0 ) {
    Object.entries(ARTIFACT_DATA).forEach(
      ([character, charData]) => {
        Object.entries(charData).forEach(
          ([piece, pieceData]) => {
            loadArtifact(character, piece);
          }
        );
      }
    );
  }
}

// create artifact slot elements for each character
const createAllSlots = function () {

  [...document.querySelector('.Farm_itemList__zk7_j').children].forEach( panel => {
    let name = panel.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML;

    if ( !isWeapon(panel) ) {
      createSlotsForPanel(panel);
    }
  });
}

// create all 5 artifact slots for a single {panel}
const createSlotsForPanel = function (panel) {

  let wrapperDiv = document.createElement('div');
  wrapperDiv.dataset.character = panel.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML.toLowerCase().replace(' ', '-');
  wrapperDiv.classList.add('artifactSlotsWrapper');

  let flowerSlot = createSlot('flower', openArtifactEditor);
    wrapperDiv.appendChild(flowerSlot);
  let plumeSlot = createSlot('plume', openArtifactEditor);
    wrapperDiv.appendChild(plumeSlot);
  let sandsSlot = createSlot('sands', openArtifactEditor);
    wrapperDiv.appendChild(sandsSlot);
  let gobletSlot = createSlot('goblet', openArtifactEditor);
    wrapperDiv.appendChild(gobletSlot);
  let circletSlot = createSlot('circlet', openArtifactEditor);
    wrapperDiv.appendChild(circletSlot);

  panel.querySelector('.ItemPanel_itemContent__1D5XB').appendChild(wrapperDiv);
}

const openArtifactEditor = function (event) {
  let targetArtifactSlot = event.target;
  let artifactOwner = getArtifactSlotOwner(targetArtifactSlot).toLowerCase();
  let artifactType = getArtifactSlotType(targetArtifactSlot);

  let editWindow = createArtifactEditor(targetArtifactSlot, ARTIFACT_SET_NAMES, artifactOwner, artifactType, confirmArtifactEdit);

  document.body.appendChild(editWindow);
}

const confirmArtifactEdit = function (event, owner, type) {
  let set = document.querySelector('#selectArtifactInput').value;
  let main = document.querySelector('#artifactMainStat').value;
  let sub = document.querySelector('#artifactSubStat').value;

  // TODO: ADD SOME KIND OF MAX LENGTH MAYBE
  // if (!set || !main || !sub) /* return */ alert("All fields must be filled!");

  if (!ARTIFACT_DATA[owner]) ARTIFACT_DATA[owner] = {}
  ARTIFACT_DATA[owner][type] = {
    set: set,
    main: main,
    sub: sub,
  }

  saveToCookies("userArtifactData", ARTIFACT_DATA)
  loadArtifact(owner, type);

  let _editor = document.querySelector('#artifactEdit');
  _editor.parentNode.removeChild(_editor); // delete the editor element once artifact is selected
}

const loadArtifact = function (character, slot) {
  slot = getArtifactSlotByOwner(character.replace(' ', '-'), slot);
  let type = getArtifactSlotType(slot);
  let set = ARTIFACT_DATA[character][type]['set'];
  if (!set) return; // if no set is set for a reason or another, abort
  let piece = DATASET[set][type]['name'];

  let image = DATASET[set][type]['image'];
  let main = ARTIFACT_DATA[character][type]['main'];
  let sub = ARTIFACT_DATA[character][type]['sub'];

  slot.style.backgroundImage = `url(https://i.imgur.com/${image}.png)`;
  slot.dataset.main = main;
  slot.dataset.sub = sub;

  slot.onmouseover = e => createHoverPopup(e, slot, set, piece);
  slot.onmouseleave = e => {
    let _window = document.querySelector('#artifactTooltipWindow');
    _window.parentNode.removeChild(_window);
  }
}

function createHoverPopup(e, slot, set, piece) {
  let {x, y} = calculatePopupLocation(slot);

  const tooltipBox = createTooltipBoxWrapper(slot, x, y, set, piece);
  document.body.appendChild(tooltipBox);
}

function saveToCookies(name, data, exdays=999) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires="+d.toUTCString();
  const cookie = [name, '=', JSON.stringify(data), ';', expires, ' ; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function loadFromCookies(name) {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1])); // frankly no clue what this does
  return result;
}

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
const isWeapon = function (panel) {
  return panel.querySelector('.ItemPanel_itemImage__2fZwL > img').src.includes('weapons');
}

// returns the name from the title element of an artifact {slot}
const getArtifactSlotOwner = function (slot) {
  return slot.parentNode.parentNode.parentNode.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML;
}

// parses and returns the artifact type from slot's class list
const getArtifactSlotType = function (slot) {
  return slot.classList.item(1).replace('Slot', '');
}

// uses custom data attribute data-character to find and return a specific artifact slot of a specific character
const getArtifactSlotByOwner = function (character, slot) {
  return document.querySelector(`div[data-character=${character}]`).querySelector(`.${slot}Slot`);
}

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getDataset () {
  const DATASET = await fetch(chrome.extension.getURL('src/js/dataset.json'));
  return DATASET.json();
}

function calculatePopupLocation(slot) {
  let rect = slot.getBoundingClientRect();

  let x = rect.left + slot.getBoundingClientRect().width;
  let y = rect.bottom - rect.height;

  return { x, y };
}

// waits until the character list has loaded and then executes the main function
export function waitForPageToLoad() {
  const waitForCharacterList = setInterval(function() {
    if (document.querySelector('.Farm_itemList__zk7_j')) {
      clearInterval(waitForCharacterList);
      console.log("Character list loaded!");

      main();
    }
  }, 100);
}
