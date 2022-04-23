// options_menu:          the dropdown Options-list
// toggleCallback:        hideAllArtifactsToggle function in content.js
// hideAllCheckboxValues: values for the stroke-dasharray attribute
export const createExtensionSettingsSection = (
  options_menu, toggleCallback,
  hideAllCheckboxValues, importCallback, exportCallback
) => {
  console.log(options_menu);
  const STORE_LINK = "https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno";
  const GITHUB_LINK = "https://github.com/kripi-png/ArtifactsForGenshinCenter";

  const EXTENSION_SETTINGS = document.createElement('div');
  EXTENSION_SETTINGS.classList.add('PlannerOptions_quickSection__pWVYz');
  EXTENSION_SETTINGS.innerHTML = `
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
  EXTENSION_SETTINGS.querySelector('#importButton').onclick = () => importCallback();
  EXTENSION_SETTINGS.querySelector('#exportButton').onclick = () => exportCallback();
  EXTENSION_SETTINGS.querySelector('button').onclick = () => toggleCallback();

  // set the dasharray attribute afterwards as for some reason it
  // turns to <path stroke-dasharray='0x' [rest as attribute key]>
  // because of the space
  EXTENSION_SETTINGS
    .querySelector('.' + 'Checkbox_checkmarkCheck__ZKcSz')
    .setAttribute('stroke-dasharray', hideAllCheckboxValues);

  // last element is the More Options button
  const options_content = options_menu.querySelector('.PlannerOptions_optionContent__2_jPR');
  options_content.insertBefore(EXTENSION_SETTINGS, options_content.lastElementChild);
};
