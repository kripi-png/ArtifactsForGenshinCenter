import {
  ARTIFACT_DATA,
  saveToLocalStorage,
} from '../dataManager.js';

import {
  removeAllArtifacts,
  loadAndCreateAllArtifacts,
} from '../artifactRenderer.js';

import {
  importArtifactData,
  exportArtifactData,
} from '../importExport.js';

// top level await is not (yet) supported by
// javascript minifiers so the awaits are wrapped inside async
// used to draw the Show all artifacts checkbox in options menu
const CHECKMARK_VALUES = {
  on: '32.526912689208984px 32.526912689208984px',
  off: '0px 32.526912689208984px'
};

// callback for toggling visibility when the setting is un/checked
const hideAllArtifactsToggle = function () {
  const checkbox_element = document.querySelector('#toggleVisibilityCheckboxPath');
  const checkbox_current = checkbox_element.getAttribute('stroke-dasharray');

  // toggle the check mark
  // unfortunately the animation would (probably) be quite hard to implement
  // I might look into it at some point
  // but currently it's not very high on the priority list
  if ( checkbox_current === CHECKMARK_VALUES.on ) {
    // hide artifact
    checkbox_element.setAttribute('stroke-dasharray', CHECKMARK_VALUES.off);
    ARTIFACT_DATA['__DISABLED'] = true;
    removeAllArtifacts();
  } else {
    // show artifacts
    checkbox_element.setAttribute('stroke-dasharray', CHECKMARK_VALUES.on);
    ARTIFACT_DATA['__DISABLED'] = false;
    loadAndCreateAllArtifacts();
  }

  saveToLocalStorage('userArtifactData', ARTIFACT_DATA);
};

export const ExtensionSettingsSection = () => {
  const STORE_LINK = "https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno";
  const GITHUB_LINK = "https://github.com/kripi-png/ArtifactsForGenshinCenter";

  const EXTENSION_SETTINGS_SECTION = document.createElement('div');
  EXTENSION_SETTINGS_SECTION.classList.add('PlannerOptions_quickSection__pWVYz');
  EXTENSION_SETTINGS_SECTION.innerHTML = `
    <div class="${'PlannerOptions_titleWrapper__pAkcp'}">Extension Settings</div>
    <div class="${'Checkbox_checkbox__yM8Z5'}">
      <div class="${'Checkbox_buttonWrapper__P_Q_b'}">
        <button>
          <svg class="${'Checkbox_checkmark__wYzQF'}"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52">
            <path
              id="toggleVisibilityCheckboxPath"
              class="${'Checkbox_checkmarkCheck__ZKcSz'}"
              d="m14 27 7 7 16-16"
              stroke-dashoffset="0px"
              stroke-dasharray=''>
            </path>
          </svg>
        </button>
      </div>
      <h3>Show all artifacts</h3>
    </div>

    <br>
    <div class="${'Radio_radio__t_pCN'}">
      <div class="${'Radio_radioLabel__FlU7k'}"" style="text-align: left;">Import / Export artifact data</div>
      <div class="${'Radio_options__vJPry'} import_export_wrapper" style="max-width: 660px;">
        <button id="importButton" class="${'Radio_option__6A9gc'}" style="width: 50%;">Import Data</button>
        <button id="exportButton" class="${'Radio_option__6A9gc'}" style="width: 50%;">Export Data</button>
      </div>
    </div>

    <div class="Radio_radioLabel__FlU7k" style="color: #38a6c2">
      <p>Enjoying the extension?</p>
      <p>
        Consider reviewing on <a href=${STORE_LINK}>Webstore</a>
        or starring on <a href=${GITHUB_LINK}>GitHub</a>.
        Thanks! <span style="color: #ccc"><3</span>
      </p>
    </div>
  `;

  // add callbacks
  EXTENSION_SETTINGS_SECTION.querySelector('#importButton').onclick = () => importArtifactData();
  EXTENSION_SETTINGS_SECTION.querySelector('#exportButton').onclick = () => exportArtifactData();
  EXTENSION_SETTINGS_SECTION.querySelector('button').onclick = () => hideAllArtifactsToggle();

  // decide which values to use for the check mark icon
  const checkmarkValues = ARTIFACT_DATA['__DISABLED']
                        ? CHECKMARK_VALUES.off
                        : CHECKMARK_VALUES.on;
  // set the dasharray attribute afterwards as for some reason it
  // turns to <path stroke-dasharray='0x' [rest as attribute key]>
  // because of the space
  EXTENSION_SETTINGS_SECTION
    .querySelector('.' + 'Checkbox_checkmarkCheck__ZKcSz')
    .setAttribute('stroke-dasharray', checkmarkValues);

  return EXTENSION_SETTINGS_SECTION;
};
