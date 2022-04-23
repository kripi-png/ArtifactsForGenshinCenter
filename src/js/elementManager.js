// piece:               name of the piece that was clicked, e.g. plume
// callback:            openArtifactEditor function in content.js
export const createSlot = (piece, callback) => {
  const SLOT = document.createElement('div');
  SLOT.classList.add('artifactSlot', piece + 'Slot');
  SLOT.addEventListener('click', callback);

  return SLOT;
};

const createArtifactSetDatalist = ARTIFACT_SET_NAMES => {
  const datalist = document.createElement('datalist');
  datalist.id = 'artifactSelectorDatalist';

  ARTIFACT_SET_NAMES.forEach(set_name => {
    const _artifact = document.createElement('option');
    _artifact.value = set_name;
    datalist.appendChild(_artifact);
  });

  return datalist;
};

// ARTIFACT_SET_NAMES:  list of all artifact sets available
// inputType:           used to create the input field
// sectionName:         title for the input field
const createSection = (ARTIFACT_SET_NAMES, inputType, sectionName, placeholder, inputValue) => {
  const SECTION = document.createElement('div');
  SECTION.classList.add('Schedule_section__8Bf3I');
  SECTION.innerHTML = `
    <p class="Schedule_sectionName___uDY_">${sectionName}</p>
    <div class="Schedule_inputWrapper__uMtN0">
      <div class="Input_input__aT3TM">
        <div class="Input_glow__nybES"></div>
        <div class="Input_innerborder__MMhtd"></div>
        <input
          class="Input_inner__SXgrG" name="name" type="text"
          style="font-size: 16px; color: black;" maxlength="20"
        />
      </div>
    </div>
  `;

  const INPUT_INPUT = SECTION.querySelector('.Input_input__aT3TM');
  const INPUT_FIELD = SECTION.querySelector('input');

  // set ID
  INPUT_FIELD.id = inputType;
  // set field value
  INPUT_FIELD.value = inputValue || '';
  // set placeholder if one's given
  if ( placeholder ) { INPUT_FIELD.placeholder = placeholder; }

  // artifact set list
  if ( inputType === 'selectArtifactInput') {
    INPUT_FIELD.setAttribute('list', 'artifactSelectorDatalist');
    INPUT_FIELD.setAttribute('maxlength', '40');
    // datalist contains all possible artifact sets as options
    // and is inserted next to the artifact set input
    INPUT_INPUT.appendChild(createArtifactSetDatalist(ARTIFACT_SET_NAMES));
  }

  // checkbox (Obtained)
  else if ( inputType === 'artifactCheckbox' ) {
    INPUT_FIELD.type = 'checkbox';
    INPUT_FIELD.style.margin = '0';
    INPUT_FIELD.checked = inputValue === 'true';

    INPUT_INPUT.style.width = '48px';
    INPUT_INPUT.style.marginLeft = 'calc(50% - 24px)';
  }

  return SECTION;
};

// slot                 artifact slot clicked
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
// callback:            confirmArtifactEdit function in content.js
export const createArtifactEditor = (
  slot, ARTIFACT_SET_NAMES,
  owner, piece,
  confirmArtifactEditCallback, deleteArtifactCallback
) => {
  const WINDOW = document.createElement('div');
  WINDOW.id = 'artifactEdit';
  WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';
  WINDOW.innerHTML = `
    <div class="Window_window__0zdsm" style="opacity: 1;"></div>
    <div class="Window_center__oA34u">
      <div class="Window_modal__2s0yi" style="opacity: 1; pointer-events: all;">
        <div class="Schedule_taskCreator__bA_eq" style="width: 360px">
          <div class="Schedule_taskTopBar__lV1W8" style="flex-direction: column;">
            <h3>Edit Artifact</h3>
            <h4 style="padding-bottom: 10px; text-transform: capitalize;">${owner}'s ${piece}</h4>
          </div>
          <div class="Schedule_taskCreatorContent__3tCoD" style="padding: 0 10px 15px">
            ${createSection(ARTIFACT_SET_NAMES, 'selectArtifactInput', 'Set Name', 'Enter set name...', slot.dataset.set).outerHTML}
            ${createSection(null, 'artifactMainStat', 'Main Stat', 'Enter main stat...', slot.dataset.main).outerHTML}
            ${createSection(null, 'artifactSubStat', 'Sub Stat', 'Enter sub stat(s)...', slot.dataset.sub).outerHTML}
            ${createSection(null, 'artifactCheckbox', 'Obtained in-game?', null, slot.dataset.check).outerHTML}
            <div class="Ascension_missing__FaHoD" style="font-size: 16px;">
              <p>Artifact data will be wiped when extension is uninstalled.</p>
              <p>Exporting and importing can be done in Options menu.</p>
            </div>
            <div class="Schedule_buttonsWrapper__fdOV_">
              <button id="editorBtnDelete">Delete</button>
              <button id="editorBtnConfirm">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  // add callbacks
  WINDOW.querySelector('#editorBtnDelete').onclick = e => deleteArtifactCallback(e, owner, piece);
  WINDOW.querySelector('#editorBtnConfirm').onclick = e => confirmArtifactEditCallback(e, owner, piece);

  return WINDOW;
};

// slot:                 hovered artifact
// x, y:                 location for the popup window
// set, piece:           names of the set and piece
export const createTooltipBoxWrapper = (slot, loc_x, loc_y, setName, pieceName) => {
  const ICON_URL = slot.style.backgroundImage
    .replaceAll('"', '')
    .replace('url(', '')
    .replace(')', '');
  const TOOLTIP_BOX = document.createElement('div');
  TOOLTIP_BOX.id = 'artifactTooltipWindow';
  TOOLTIP_BOX.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;';
  TOOLTIP_BOX.innerHTML = `
    <!-- wrapper -->
    <div class="artifactTooltip" style="position: sticky; left: ${loc_x}px; top: ${loc_y}px;">
      <div class="tooltipTitle">
        <p class="tooltipTitleText">
          <span>${pieceName}</span><br />${setName}
        </p>
        <img src="${ICON_URL}" alt="${setName}-${pieceName}" class="tooltipTitleIcon" />
      </div>
      <div class="tooltipTextWrapper">
        <p class="tooltipText">
          Main Stat: ${slot.dataset.main}
        </p>
        <p class="tooltipText">
          Sub Stat: ${slot.dataset.sub}
        </p>
      </div>
    </div>
  `;

  return TOOLTIP_BOX;
};

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

// options_window:        div#options element
// importCallback:        importArtifactData function in content.js
// exportCallback:        exportArtifactData function in content.js
export const createExportImportSection = (importCallback, exportCallback) => {
  const OPTION_SECTION = document.createElement('div');
  OPTION_SECTION.classList.add('PlannerOptions_section__y90n3');

  OPTION_SECTION.innerHTML = `
    <div class="Radio_radio__t_pCN">
      <div class="Radio_radioLabel__FlU7k">
        Extension Setting: Import / Export Artifact Data
      </div>
      <div class="Radio_options__vJPry import_export_wrapper" style="max-width: 440px;">
        <div id="importData" class="Radio_option__6A9gc" title="Import Data">
          <div class="Radio_selected__oB7Tk" style="visibility: visible; opacity: 1; transform-origin: 50% 50% 0px;"></div>
          Import Data
        </div>
        <div id="exportData" class="Radio_option__6A9gc" title="Export Data">Export Data</div>
      </div>
    </div>
  `;

  // add callbacks
  OPTION_SECTION.querySelector('#importData').onclick = () => importCallback();
  OPTION_SECTION.querySelector('#exportData').onclick = () => exportCallback();

  return OPTION_SECTION;
};

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

// options_menu:          the dropdown Options-list
// toggleCallback:        hideAllArtifactsToggle function in content.js
// hideAllCheckboxValues: values for the stroke-dasharray attribute
export const createExportWindow = (ARTIFACT_DATA, closeExportWindowCallback) => {
  const WINDOW =
    document.createElement('div');
    WINDOW.id = 'exportWindow';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  const window_background = // element for the dark background
    document.createElement('div');
    window_background.classList.add('Window_window__0zdsm');
    window_background.style.opacity = '1';
    WINDOW.appendChild(window_background);

  const window_center =
    document.createElement('div');
    window_center.classList.add('Window_center__oA34u');
    WINDOW.appendChild(window_center);

  const window_modal =
    document.createElement('div');
    window_modal.classList.add('Window_modal__2s0yi');
    window_modal.style = 'opacity: 1; pointer-events: all;';
    window_center.appendChild(window_modal);

  const schedule_creator =
    document.createElement('div');
    schedule_creator.classList.add('Schedule_taskCreator__bA_eq');
    schedule_creator.style.width = '360px';
    window_modal.appendChild(schedule_creator);

  // TITLE
  const schedule_top_bar =
    document.createElement('div');
    schedule_top_bar.classList.add('Schedule_taskTopBar__lV1W8');
    schedule_top_bar.style = 'flex-direction: column;';
    schedule_top_bar.innerHTML = "<h3>Export Artifact Data</h3>";
    schedule_creator.appendChild(schedule_top_bar);

  const schedule_content =
    document.createElement('div');
    schedule_content.classList.add('Schedule_taskCreatorContent__3tCoD');
    schedule_content.style.padding = '0 10px 15px';
    schedule_creator.appendChild(schedule_content);

    schedule_content.appendChild(createSection(null, 'exportDataField', 'Export Data', null, ARTIFACT_DATA));

    const close_button =
      document.createElement('div');
      close_button.innerHTML = `
        <div class="Schedule_buttonsWrapper__fdOV_">
          <button id="closeButton">Close</button>
        </div>`;
    close_button.querySelector('#closeButton').onclick = e => closeExportWindowCallback(e);
    schedule_content.appendChild(close_button);

  document.body.appendChild(WINDOW);
};
