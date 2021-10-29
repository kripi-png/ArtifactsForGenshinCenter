import { createSlot, createArtifactEditor } from './elementManager.js'

const main = function () {
  createAllSlots();
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
  wrapperDiv.classList.add('artifactSlotsWrapper');

  let flowerSlot = createSlot("flowerSlot", "Click here to select a flower!", openArtifactEditor);
  wrapperDiv.appendChild(flowerSlot);
  let plumeSlot = createSlot("plumeSlot", "Click here to select a plume!", openArtifactEditor);
  wrapperDiv.appendChild(plumeSlot);
  let sandsSlot = createSlot("sandsSlot", "Click here to select a sands!", openArtifactEditor);
  wrapperDiv.appendChild(sandsSlot);
  let gobletSlot = createSlot("gobletSlot", "Click here to select a goblet!", openArtifactEditor);
  wrapperDiv.appendChild(gobletSlot);
  let circletSlot = createSlot("circletSlot", "Click here to select a circlet!", openArtifactEditor);
  wrapperDiv.appendChild(circletSlot);


  panel.querySelector('.ItemPanel_itemContent__1D5XB').appendChild(wrapperDiv);
}

const openArtifactEditor = function (event) {
  let targetArtifactSlot = event.target;
  let artifactOwner = getArtifactSlotOwner(targetArtifactSlot);
  let artifactType = capitalizeFirstLetter(getArtifactSlotType(targetArtifactSlot));
  console.log(`${artifactOwner}'s ${artifactType}`);

  let editWindow = createArtifactEditor(targetArtifactSlot, artifactOwner, artifactType, confirmArtifactEdit);

  document.body.appendChild(editWindow);
}

const confirmArtifactEdit = function (event) {
  let set = document.querySelector('#selectArtifactInput').value;
  let main = document.querySelector('#mainStatDiv > input').value;
  let sub = document.querySelector('#subStatDiv > input').value;

  if (!set || !main || !sub) /* return */ alert("All fields must be filled!");

  let _editor = document.querySelector('#artifactEdit');
  _editor.parentNode.removeChild(_editor); // delete the editor element once artifact is selected
}

// const loadArtifact = function (character = null) {
//   if ( character ) {
//     // reload artifacts of / for this specific character
//   } else {
//     // reload artifacts of / for ALL character
//   }
// }

function createHoverPopup() {

}

function saveToCookies(data) {
  return ;
}

function loadFromCookies() {
  return ;
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

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
