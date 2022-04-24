import {
  ARTIFACT_DATA,
  saveToLocalStorage,
} from '../dataManager.js';

const hideArtifacts = function (button, slotWrapper, character) {
  console.log(ARTIFACT_DATA);

  const disabled = slotWrapper.classList.contains('disabled');
  button.title = disabled ? "Hide Artifacts" : "Show Artifacts";
  slotWrapper.classList.toggle('disabled');

  // make sure object for character exists
  if (!ARTIFACT_DATA[character]) { ARTIFACT_DATA[character] = { disabled: false }; }
  ARTIFACT_DATA[character]['disabled'] = !ARTIFACT_DATA[character]['disabled'];

  saveToLocalStorage('userArtifactData', ARTIFACT_DATA);
};

const hidingButtonCallback = function (e) {
  // e.target is div.CircleButton_inner__'something' so get the div element
  const button = e.target.parentNode.parentNode;
  // find the artifact slot wrapper by the character name stored in the button div element
  const character = e.target.parentNode.parentNode.dataset.character;
  const slotWrapper = document.querySelector(`.artifactSlotsWrapper[data-character=${character}]`);
  // ARTIFACT_DATA doesn't use hypens in character names (yet) so replace them
  hideArtifacts(button, slotWrapper, button.dataset.character.replaceAll('-', ' '));
};

// disabled:              boolean
// character:             name of the character
export const ArtifactHidingButton = (disabled, character) => {
  const HIDING_BUTTON = document.createElement('div');
  HIDING_BUTTON.classList.add('ItemPanel_buttonWrapper__KgdUz', 'ItemPanel_pauseButton__hI9FU', 'HideArtifactsButton');
  HIDING_BUTTON.style = 'right: 80px';
  HIDING_BUTTON.dataset.character = character;
  HIDING_BUTTON.title = disabled ? "Show Artifacts" : "Hide Artifacts";
  HIDING_BUTTON.innerHTML = `
    <button class="CircleButton_button__WO_pU">
      <div class="CircleButton_glow__dQqlu"></div>
      <div class="CircleButton_innerborder__OFRXM"></div>
      <div class="CircleButton_inner__VXFE7"></div>
      <div class="CircleButton_img__OGgKs">
        <div class="containedImage" style="background-image: url('https://i.imgur.com/liC3uM6.png')"></div>
      </div>
    </button>
  `;

  // add callbacks
  HIDING_BUTTON.querySelector('.CircleButton_button__WO_pU').onclick = e => hidingButtonCallback(e);
  // not quite sure why but without this the button stays focused and
  // won't disappear when panel is unhovered
  HIDING_BUTTON.onmousedown = e => e.preventDefault();

  return HIDING_BUTTON;
};
