// panel:                 character panel
// owner:                 name of the character
// callback:              hidingButtonCallback function in content.js
export const createArtifactHidingButton = (panel, character, callback) => {
  const ARTIFACT_HIDING_BTN = document.createElement('div');
  ARTIFACT_HIDING_BTN.classList.add('ItemPanel_buttonWrapper__KgdUz', 'ItemPanel_pauseButton__hI9FU', 'HideArtifactsButton');
  ARTIFACT_HIDING_BTN.style = 'right: 80px';
  ARTIFACT_HIDING_BTN.dataset.character = character;

  // get slotWrapper element by character's name and check whether it has disabled class
  // set title using ternary operator based on that value
  const disabled = panel
    .querySelector(`.artifactSlotsWrapper[data-character=${character}]`).classList
    .contains('disabled');
  ARTIFACT_HIDING_BTN.title = disabled ? "Show Artifacts" : "Hide Artifacts";

  // not quite sure why but without this the button stays focused and
  // the buttons won't disappear when panel is unhovered
  ARTIFACT_HIDING_BTN.onmousedown = e => e.preventDefault();

  ARTIFACT_HIDING_BTN.innerHTML = `
    <button class="CircleButton_button__WO_pU">
      <div class="CircleButton_glow__dQqlu"></div>
      <div class="CircleButton_innerborder__OFRXM"></div>
      <div class="CircleButton_inner__VXFE7"></div>
      <div class="CircleButton_img__OGgKs">
        <div class="containedImage" style="background-image: url('https://i.imgur.com/liC3uM6.png')"></div>
      </div>
    </button>
  `;

  // add callback
  ARTIFACT_HIDING_BTN.querySelector('.CircleButton_button__WO_pU').onclick = e => callback(e);

  // insert artifact hiding button before the active button
  const BUTTON_PANEL = panel.querySelector('.ItemPanel_item__6lLWZ');
  const ACTIVE_BUTTON = BUTTON_PANEL.querySelector('div[title=Active]');
  BUTTON_PANEL.insertBefore( ARTIFACT_HIDING_BTN, ACTIVE_BUTTON );
};
