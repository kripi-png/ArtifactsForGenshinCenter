import { createSlot, createArtifactEditor } from './elementManager.js';

const ARTIFACT_DATA = loadFromCookies('userArtifactData') || {};
const DATASET = await getDataset()
console.log(DATASET);

const ARTIFACT_SET_NAMES = Object.keys(DATASET)

const main = function () {
  createAllSlots();

  console.log(ARTIFACT_DATA);

  if ( Object.keys(ARTIFACT_DATA).length != 0 ) {
    Object.entries(ARTIFACT_DATA).forEach(
      ([character, charData]) => {
        Object.entries(charData).forEach(
          ([piece, pieceData]) => {
            loadArtifact(character, piece)
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
    console.log(name, isWeapon(panel));

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

  let flowerSlot = createSlot("flower", openArtifactEditor);
  wrapperDiv.appendChild(flowerSlot);
  let plumeSlot = createSlot("plume", openArtifactEditor);
  wrapperDiv.appendChild(plumeSlot);
  let sandsSlot = createSlot("sands", openArtifactEditor);
  wrapperDiv.appendChild(sandsSlot);
  let gobletSlot = createSlot("goblet", openArtifactEditor);
  wrapperDiv.appendChild(gobletSlot);
  let circletSlot = createSlot("circlet", openArtifactEditor);
  wrapperDiv.appendChild(circletSlot);


  panel.querySelector('.ItemPanel_itemContent__1D5XB').appendChild(wrapperDiv);
}

const openArtifactEditor = function (event) {
  let targetArtifactSlot = event.target;
  let artifactOwner = getArtifactSlotOwner(targetArtifactSlot).toLowerCase();
  let artifactType = getArtifactSlotType(targetArtifactSlot);
  console.log(`${capitalizeFirstLetter(artifactOwner)}'s ${capitalizeFirstLetter(artifactType)}`);

  let editWindow = createArtifactEditor(targetArtifactSlot, ARTIFACT_SET_NAMES, artifactOwner, artifactType, confirmArtifactEdit);

  document.body.appendChild(editWindow);
}

const confirmArtifactEdit = function (event, owner, type) {
  let set = document.querySelector('#selectArtifactInput').value;
  let main = document.querySelector('#mainStatDiv > input').value;
  let sub = document.querySelector('#subStatDiv > input').value;

  // if (!set || !main || !sub) /* return */ alert("All fields must be filled!");

  console.log(owner, type);

  if (!ARTIFACT_DATA[owner]) ARTIFACT_DATA[owner] = {}
  ARTIFACT_DATA[owner][type] = {
    set: set,
    main: main,
    sub: sub,
  }

  console.log(ARTIFACT_DATA);

  saveToCookies("userArtifactData", ARTIFACT_DATA)
  loadArtifact(owner, type);

  let _editor = document.querySelector('#artifactEdit');
  _editor.parentNode.removeChild(_editor); // delete the editor element once artifact is selected
}

const loadArtifact = function (character, slot) {
  slot = getArtifactSlotByOwner(character.replace(' ', '-'), slot);
  console.log(slot);
  let type = getArtifactSlotType(slot);
  let set = ARTIFACT_DATA[character][type]['set'];
  console.log(character, type, set);
  let main = ARTIFACT_DATA[character][type]['main'];
  let sub = ARTIFACT_DATA[character][type]['sub'];

  console.log('https://impact.moe/'+DATASET[set][type]['image']);

  slot.style.backgroundImage = `url(https://impact.moe/${DATASET[set][type]['image']})`;
}

function createHoverPopup() {

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
  result && (result = JSON.parse(result[1]));
  return result;
}

// returns whether {panel} is a weapon by checking the source of the panel's image
// e.g. src='/images/weapons/regular/Deathmatch.png'
const isWeapon = function (panel) {
  return panel.querySelector('.ItemPanel_itemImage__2fZwL > img').src.includes('weapons');
}

const getArtifactSlotOwner = function (slot) {
  return slot.parentNode.parentNode.parentNode.querySelector('.ItemPanel_itemName__3SNcx > p').innerHTML;
}

const getArtifactSlotType = function (slot) {
  return slot.classList.item(1).replace('Slot', '');
}

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

export function waitForPageToLoad() {
  const waitForCharacterList = setInterval(function() {
    if (document.querySelector('.Farm_itemList__zk7_j')) {
      clearInterval(waitForCharacterList);
      console.log("Character list loaded!");

      main();
    }
  }, 100);
}
