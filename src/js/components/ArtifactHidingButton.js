import {
  ARTIFACT_DATA,
  saveToLocalStorage,
} from '../dataManager.js';

const hideArtifacts = (button, slotWrapper, character, disabled) => {
  // toggle button title and class
  button.title = disabled ? "Hide Artifacts" : "Show Artifacts";
  slotWrapper.classList.toggle('disabled');

  // make sure object for character exists
  if (!ARTIFACT_DATA[character]) {
    ARTIFACT_DATA[character] = { disabled: false };
  }
  ARTIFACT_DATA[character]['disabled'] = !ARTIFACT_DATA[character]['disabled'];

  saveToLocalStorage('userArtifactData', ARTIFACT_DATA);
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
  // find the artifact slot wrapper by the character namet
  const SLOT_WRAPPER = document.querySelector(`.artifactSlotsWrapper[data-character=${character}]`);

  // add callbacks
  HIDING_BUTTON.querySelector('button').onclick = e => hideArtifacts(HIDING_BUTTON, SLOT_WRAPPER, character.replaceAll('-', ' '), disabled);
  // not quite sure why but without this the button stays focused and
  // won't disappear when panel is unhovered
  HIDING_BUTTON.onmousedown = e => e.preventDefault();

  return HIDING_BUTTON;
};
