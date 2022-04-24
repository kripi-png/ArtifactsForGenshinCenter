// disabled:              boolean
// character:             name of the character
// hideArtifactsCallback: hidingButtonCallback function in content.js
export const ArtifactHidingButton = (disabled, character, hideArtifactsCallback) => {
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
  HIDING_BUTTON.querySelector('.CircleButton_button__WO_pU').onclick = e => hideArtifactsCallback(e);
  // not quite sure why but without this the button stays focused and
  // won't disappear when panel is unhovered
  HIDING_BUTTON.onmousedown = e => e.preventDefault();

  return HIDING_BUTTON;
};
