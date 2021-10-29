import { createSlot } from './elementManager.js'

const main = function () {
  createAllSlots();

  createSlot();
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
  console.log(event.target);
  let targetArtifactSlot = event.target;

  // THESE CLASSES AND STYLES ARE DIRECTRLY YOINKED FROM THE ORIGINAL WEBSITE

  let editWindow = document.createElement('div');
  editWindow.id = 'artifactEdit';
  editWindow.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  let editorBackgroudDiv = document.createElement('div');
  editorBackgroudDiv.classList.add('Window_window__2tU_Y');
  editWindow.appendChild(editorBackgroudDiv);

  let editorModal = document.createElement('div');
  editorModal.classList.add('Window_modal__2xmK7');

  let editorWrapper = document.createElement('div');
  editorWrapper.classList.add('Edit_edit___eEru');


  let title = document.createElement('h3');
  title.innerHTML = "Sayu's Plume"
  title.style = "background: linear-gradient(160deg, rgba(89, 84, 130, 0.565) 0%, rgba(120, 102, 157, 0.565) 39%, rgba(183, 133, 201, 0.565) 100%);"
  editorWrapper.appendChild(title);

  /**
  * ADD ALL ELEMENTS INSIDE editorContent
  **/

  let editorContent = document.createElement('div');
  editorContent.classList.add('Edit_content__LoWoP');
  editorWrapper.appendChild(editorContent);

  let artifactInputWrapper = document.createElement('div');
  artifactInputWrapper.id = 'artifactInputWrapper';

  let selectArtifactText = document.createElement('p');
  selectArtifactText.innerHTML = "Select Artifact Set";

  let selectArtifactInput = document.createElement('input');
  selectArtifactInput.setAttribute('list', 'artifactSelectorDatalist');
  selectArtifactInput.id = "selectArtifactInput";

  let selectArtifactDatalist = document.createElement('datalist');
  selectArtifactDatalist.id = 'artifactSelectorDatalist';
  ['Pale Flame', 'Adventurer', 'Exile'].forEach(a => {
    let _artifact = document.createElement('option');
    _artifact.value = a;
    selectArtifactDatalist.appendChild(_artifact);
  });

  artifactInputWrapper.appendChild(selectArtifactText);
  artifactInputWrapper.appendChild(selectArtifactInput);
  artifactInputWrapper.append(selectArtifactDatalist);


  let mainStat = document.createElement('div');
  mainStat.id = 'mainStatDiv';
  let mainStatText = document.createElement('p');
  mainStatText.innerHTML = "Enter Main Stat";
  let mainStatInput = document.createElement('input');
  mainStat.appendChild(mainStatText);
  mainStat.appendChild(mainStatInput);

  let subStat = document.createElement('div');
  subStat.id = 'subStatDiv';
  let subStatText = document.createElement('p');
  subStatText.innerHTML = "Enter Sub Stat";
  let subStatInput = document.createElement('input');
  subStat.appendChild(subStatText);
  subStat.appendChild(subStatInput);

  editorWrapper.appendChild(artifactInputWrapper);
  editorWrapper.appendChild(mainStat);
  editorWrapper.appendChild(subStat);

  let editorButton = document.createElement('div');
  editorButton.classList.add('Edit_buttonWrapper__28k9J');
  editorWrapper.appendChild(editorButton);
  editorButton.innerHTML = '<button class="RectButton_button__P4PnK"><div class="RectButton_inner__1BYot"></div><div class="RectButton_border__1xPUl"></div><div class="RectButton_label__1JD0E">OK</div></button>';

  editorModal.appendChild(editorWrapper);
  editWindow.appendChild(editorModal);
  document.body.appendChild(editWindow);

  document.querySelector('.Edit_buttonWrapper__28k9J > button.RectButton_button__P4PnK').addEventListener('click', e=>confirmArtifactEdit());
}

const confirmArtifactEdit = function (event) {
  let set = document.querySelector('#selectArtifactInput').value;
  let main = document.querySelector('#mainStatDiv > input').value;
  let sub = document.querySelector('#subStatDiv > input').value;

  if (!set || !main || !sub) {
    alert("All fields must be filled!");
    // return;
  }

  let _editor = document.querySelector('#artifactEdit');
  _editor.parentNode.removeChild(_editor); // delete the editor element once artifact is selected
}

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

export function waitForPageToLoad() {
  const waitForCharacterList = setInterval(function() {
    if (document.querySelector('.Farm_itemList__zk7_j')) {
      clearInterval(waitForCharacterList);
      console.log("Character list loaded!");

      main();
    }
  }, 100);
}
