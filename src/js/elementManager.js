const BUTTON_BAR_WRAPPER_ELEM = '.ItemPanel_item__6lLWZ';
const BUTTON_BAR_BUTTON_CLASS = ['ItemPanel_buttonWrapper__KgdUz', 'ItemPanel_pauseButton__hI9FU', 'HideArtifactsButton'];
const SCHEDULE_BUTTON_WRAPPER = 'Schedule_buttonsWrapper__fdOV_';

const WINDOW_BACKGROUND = 'Window_window__0zdsm';
const WINDOW_CENTER = 'Window_center__oA34u';
const WINDOW_MODAL = 'Window_modal__2s0yi';
const SCHEDULE_TASK_CREATOR = 'Schedule_taskCreator__bA_eq';
const SCHEDULE_TASK_CREATOR_CONTENT = 'Schedule_taskCreatorContent__3tCoD';
const SCHEDULE_TOP_BAR = 'Schedule_taskTopBar__lV1W8';
const SCHEDULE_WARNING_TEXT = 'Schedule_warning__ea_RU';

const HIDING_BUTTON = 'CircleButton_button__WO_pU';
const HIDING_BUTTON_GLOW = 'CircleButton_glow__dQqlu';
const HIDING_BUTTON_INNERBORDER = 'CircleButton_innerborder__OFRXM';
const HIDING_BUTTON_INNER = 'CircleButton_inner__VXFE7';

const OPTIONS_WINDOW_SECTION = 'PlannerOptions_section__y90n3';
const OPTIONS_WINDOW_CONTENT = '.PlannerOptions_content__kBajJ';
const OPTIONS_RADIO = 'Radio_radio__t_pCN';
const OPTIONS_RADIO_LABEL = 'Radio_radioLabel__FlU7k';
const RADIO_OPTIONS = 'Radio_options__vJPry';
const RADIO_OPTION = 'Radio_option__6A9gc';
const RADIO_OPTION_SELECTED = 'Radio_selected__oB7Tk';
const OPTIONS_CONTENT = '.PlannerOptions_optionContent__2_jPR';

const QUICKMENU_SECTION = 'PlannerOptions_quickSection__pWVYz';
const QUICKMENU_TITLEWRAPPER = 'PlannerOptions_titleWrapper__pAkcp';
const QUICKMENU_CHECKBOX = 'Checkbox_checkbox__yM8Z5';
const QUICKMENU_CHECKBOX_BUTTON_WRAPPER = 'Checkbox_buttonWrapper__P_Q_b';
const QUICKMENU_CHECKBOX_SVG = 'Checkbox_checkmark__wYzQF';
const QUICKMENU_CHECKBOX_PATH = 'Checkbox_checkmarkCheck__ZKcSz';

// piece:               name of the piece that was clicked, e.g. plume
// callback:            openArtifactEditor function in content.js
export const createSlot = function (piece, callback) {
  const SLOT =
    document.createElement('div');
    SLOT.classList.add('artifactSlot', piece + 'Slot');
    SLOT.addEventListener('click', callback);
  return SLOT;
};

const createArtifactSetDatalist = function ( ARTIFACT_SET_NAMES) {
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
const createSection = function (ARTIFACT_SET_NAMES, inputType, sectionName, placeholder, inputValue) {
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

  // checkbox (Acquired)
  else if ( inputType === 'artifactCheckbox' ) {
    INPUT_FIELD.type = 'checkbox';
    INPUT_FIELD.style.margin = '0';
    INPUT_FIELD.checked = inputValue === 'true';

    INPUT_INPUT.style.width = '48px';
    INPUT_INPUT.style.marginLeft = 'calc(50% - 24px)';
  }

  return SECTION;
};

// callback:            confirmArtifactEdit function in content.js
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
const createEditorButton = function (confirmArtifactEditCallback, deleteArtifactCallback, owner, piece) {
  const BUTTON_WRAPPER =
    document.createElement('div');
    BUTTON_WRAPPER.classList.add(SCHEDULE_BUTTON_WRAPPER);

  const delete_button =
    document.createElement('button');
    delete_button.innerHTML = "Delete";
    delete_button.onclick = e => deleteArtifactCallback(e, owner, piece);
    BUTTON_WRAPPER.append(delete_button);

  const create_button =
    document.createElement('button');
    create_button.innerHTML = "OK";
    create_button.onclick = e => confirmArtifactEditCallback(e, owner, piece);
    BUTTON_WRAPPER.append(create_button);

  return BUTTON_WRAPPER;
};

// slot                 artifact slot clicked
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
// callback:            confirmArtifactEdit function in content.js
export const createArtifactEditor = function (slot, ARTIFACT_SET_NAMES, owner, piece, confirmArtifactEditCallback, deleteArtifactCallback) {
  const WINDOW =
    document.createElement('div');
    WINDOW.id = 'artifactEdit';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  const window_background = // element for the dark background behind the actual editor
    document.createElement('div');
    window_background.classList.add(WINDOW_BACKGROUND);
    window_background.style.opacity = '1';
    WINDOW.appendChild(window_background);

  const window_center =
    document.createElement('div');
    window_center.classList.add(WINDOW_CENTER);
    WINDOW.appendChild(window_center);

  const window_modal =
    document.createElement('div');
    window_modal.classList.add(WINDOW_MODAL);
    window_modal.style = 'opacity: 1; pointer-events: all;';
    window_center.appendChild(window_modal);

  const schedule_creator =
    document.createElement('div');
    schedule_creator.classList.add(SCHEDULE_TASK_CREATOR);
    schedule_creator.style.width = '360px';
    window_modal.appendChild(schedule_creator);

  // TITLE
  const schedule_top_bar =
    document.createElement('div');
    schedule_top_bar.classList.add(SCHEDULE_TOP_BAR);
    schedule_top_bar.style = 'flex-direction: column;';
    schedule_top_bar.innerHTML =
        `<h3>Edit Artifact</h3>
        <h4 style="padding-bottom: 10px; text-transform: capitalize;">${owner}'s ${piece}</h4>`;
    schedule_creator.appendChild(schedule_top_bar);

  const warning_text =
    document.createElement('div');
    warning_text.classList.add(SCHEDULE_WARNING_TEXT);
    // warning_text.style.textAlign = 'center';
    // warning_text.style.color = 'red';
    warning_text.innerHTML = `Artifact data will be wiped when extension
                              is uninstalled. Exporting and importing can
                              be done in Options menu.`;

  const schedule_content =
    document.createElement('div');
    schedule_content.classList.add(SCHEDULE_TASK_CREATOR_CONTENT);
    schedule_content.style.padding = '0 10px 15px';
    schedule_creator.appendChild(schedule_content);

    schedule_content.appendChild(createSection(ARTIFACT_SET_NAMES, 'selectArtifactInput', 'Set Name', 'Enter set name...', slot.dataset.set));
    schedule_content.appendChild(createSection(null, 'artifactMainStat', 'Main Stat', 'Enter main stat...', slot.dataset.main));
    schedule_content.appendChild(createSection(null, 'artifactSubStat', 'Sub Stat', 'Enter sub stat(s)...', slot.dataset.sub));
    schedule_content.appendChild(createSection(null, 'artifactCheckbox', 'Obtained in-game?', null, slot.dataset.check));
    schedule_content.appendChild(warning_text);
    schedule_content.appendChild(createEditorButton(confirmArtifactEditCallback, deleteArtifactCallback, owner, piece));

  return WINDOW;
};

// slot:                 hovered artifact
// x, y:                 location for the popup window
// set, piece:           names of the set and piece
export const createTooltipBoxWrapper = function (slot, x, y, set, piece) {
  const setName = set;
  const pieceName = piece;
  const WINDOW =
    document.createElement('div');
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;';
    WINDOW.id = 'artifactTooltipWindow';

  const WRAPPER =
    document.createElement('div');
    WRAPPER.classList.add('artifactTooltip');

    WRAPPER.style.position = 'sticky';
    WRAPPER.style.left = x + 'px';
    WRAPPER.style.top = y + 'px';

  const titleBar = // wrapper for title text & icon
    document.createElement('div');
    titleBar.classList.add('tooltipTitle');
    WRAPPER.appendChild(titleBar);

  const titleText =
    document.createElement('p');
    titleText.classList.add('tooltipTitleText');
    titleText.innerHTML = `<span>${pieceName}</span><br>${setName}`;
    titleBar.appendChild(titleText);

  const titleIcon = // yoink the title icon directly from the hovered element
    document.createElement('img');
    titleIcon.classList.add('tooltipTitleIcon');
    titleIcon.src = slot.style.backgroundImage.replaceAll('"', '').replace('url(', '').replace(')', '');
    titleBar.appendChild(titleIcon);

  const textWrapper = // wrapper for main stat & sub stat texts
    document.createElement('div');
    textWrapper.classList.add('tooltipTextWrapper');
    WRAPPER.appendChild(textWrapper);

  const main =
    document.createElement('p');
    main.classList.add('tooltipText');
    main.innerHTML = "Main Stat: " + slot.dataset.main;
    textWrapper.appendChild(main);

  const sub =
    document.createElement('p');
    sub.classList.add('tooltipText');
    sub.innerHTML = "Sub Stat: " + slot.dataset.sub;
    textWrapper.appendChild(sub);

  WINDOW.appendChild(WRAPPER);

  return WINDOW;
};

// panel:                 character panel
// owner:                 name of the character
// callback:              hidingButtonCallback function in content.js
export const createArtifactHidingButton = function (panel, owner, callback) {
  const BUTTON_WRAPPER =
    document.createElement('div');
    // get slotWrapper element by owner's name and check whether it has disabled class
    // set title using ternary operator based on that value
    BUTTON_WRAPPER.title =
        panel.querySelector(`.artifactSlotsWrapper[data-character=${owner}]`)
        .classList.contains('disabled')
          ? "Show Artifacts"
          : "Hide Artifacts";
    BUTTON_WRAPPER.classList.add(...BUTTON_BAR_BUTTON_CLASS);
    BUTTON_WRAPPER.style.right = '80px';
    BUTTON_WRAPPER.dataset.character = owner;
    // not quite sure why but without this line the button stays focused and
    // the buttons won't disappear when panel is unhovered
    BUTTON_WRAPPER.onmousedown = e => e.preventDefault();

  const button =
    document.createElement('button');
    button.classList.add(HIDING_BUTTON);
    button.onclick = e => callback(e);
    BUTTON_WRAPPER.appendChild(button);

  const button_glow =
    document.createElement('div');
    button_glow.classList.add(HIDING_BUTTON_GLOW);
    button.appendChild(button_glow);
  const button_innerborder =
    document.createElement('div');
    button_innerborder.classList.add(HIDING_BUTTON_INNERBORDER);
    button.appendChild(button_innerborder);
  const button_inner =
    document.createElement('div');
    button_inner.classList.add(HIDING_BUTTON_INNER);
    button.appendChild(button_inner);

  const button_image_holder =
    document.createElement('div');
    button_image_holder.classList.add('CircleButton_img__OGgKs');
    button.appendChild(button_image_holder);

  const button_image =
    document.createElement('div');
    button_image.classList.add('containedImage');
    button_image.style.backgroundImage = 'url("https://i.imgur.com/liC3uM6.png")';
    button_image_holder.appendChild(button_image);

  const bar = panel.querySelector(BUTTON_BAR_WRAPPER_ELEM);
  // div[title=Active] is the disable/enable button
  bar.insertBefore( BUTTON_WRAPPER, bar.querySelector('div[title=Active]') );
};

// options_window:        div#options element
// importCallback:        importArtifactData function in content.js
// exportCallback:        exportArtifactData function in content.js
export const addExportImportToOptionsWindow = function (options_window, importCallback, exportCallback) {
  const OPTION_SECTION =
    document.createElement('div');
    OPTION_SECTION.classList.add(OPTIONS_WINDOW_SECTION);

  const WRAPPER =
    document.createElement('div');
    WRAPPER.classList.add(OPTIONS_RADIO);
    OPTION_SECTION.appendChild(WRAPPER);

  const title =
    document.createElement('div');
    title.classList.add(OPTIONS_RADIO_LABEL);
    title.innerHTML = "Extension Setting: Import / Export Artifact Data";
    WRAPPER.appendChild(title);

  const button_wrapper =
    document.createElement('div');
    button_wrapper.classList.add(RADIO_OPTIONS, 'import_export_wrapper');
    button_wrapper.style = 'max-width: 440px';
    WRAPPER.appendChild(button_wrapper);

  const import_button =
    document.createElement('button');
    import_button.classList.add(RADIO_OPTION);
    import_button.title = "Import Data";
    import_button.onclick = () => importCallback();
    import_button.innerHTML =
      `<div class='${RADIO_OPTION_SELECTED}' style='visibility: visible; opacity: 1;` +
      "transform-origin: 50% 50% 0px;'></div>" +
      "Import Data";
    button_wrapper.appendChild(import_button);

  const export_button =
    document.createElement('button');
    export_button.classList.add(RADIO_OPTION);
    export_button.title = "Export Data";
    export_button.onclick = () => exportCallback();
    export_button.innerHTML = "Export Data";
    button_wrapper.appendChild(export_button);

  options_window.querySelector(OPTIONS_WINDOW_CONTENT).appendChild(OPTION_SECTION);
};

// options_menu:          the dropdown Options-list
// toggleCallback:        hideAllArtifactsToggle function in content.js
// hideAllCheckboxValues: values for the stroke-dasharray attribute
export const createExtensionSettingsSection = function (options_menu, toggleCallback, hideAllCheckboxValues, importCallback, exportCallback) {
  console.log(options_menu);
  const SECTION_WRAPPER =
    document.createElement('div');
    SECTION_WRAPPER.classList.add(QUICKMENU_SECTION);
    SECTION_WRAPPER.innerHTML =
      `<div class="${QUICKMENU_TITLEWRAPPER}">Extension Settings</div>
      <div class="${QUICKMENU_CHECKBOX}">
        <div class="${QUICKMENU_CHECKBOX_BUTTON_WRAPPER}">
          <button>
            <svg
              class="${QUICKMENU_CHECKBOX_SVG}"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52">
              <path
                id="toggleVisibilityCheckboxPath"
                class="${QUICKMENU_CHECKBOX_PATH}"
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
      <div class="${OPTIONS_RADIO}">
        <div class="${OPTIONS_RADIO_LABEL}"" style="text-align: left;">Import / Export artifact data</div>
        <div class="${RADIO_OPTIONS} import_export_wrapper" style="max-width: 660px;">
          <button id="importButton" class="${RADIO_OPTION}" style="width: 50%;">Import Data</button>
          <button id="exportButton" class="${RADIO_OPTION}" style="width: 50%;">Export Data</button>
        </div>
      </div>`;

    SECTION_WRAPPER.querySelector('#importButton').onclick = () => importCallback();
    SECTION_WRAPPER.querySelector('#exportButton').onclick = () => exportCallback();

    // set the dasharray attribute afterwards as for some reason it
    // turns to <path stroke-dasharray='0x' [rest as attribute key]>
    // because of the space
    SECTION_WRAPPER
      .querySelector('.' + QUICKMENU_CHECKBOX_PATH)
      .setAttribute('stroke-dasharray', hideAllCheckboxValues);
    // assign the callback function
    SECTION_WRAPPER.querySelector('button').onclick = () => toggleCallback();

    const reviewNotif =
      document.createElement('div');
      reviewNotif.classList.add(OPTIONS_RADIO_LABEL);
      reviewNotif.style.color = '#38a6c2';
      const storeLink = "https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno";
      const gitLink = "https://github.com/kripi-png/ArtifactsForGenshinCenter";
      reviewNotif.innerHTML = `
        <br>Enjoying the extension?<br>Consider reviewing on
        <a href=${storeLink}>Webstore</a>
        or starring on <a href=${gitLink}>GitHub</a>.
        Thanks! <span style="color: #ccc"><3</span>`;
      SECTION_WRAPPER.appendChild(reviewNotif);

  // last element is the More Options button
  const options_content = options_menu.querySelector(OPTIONS_CONTENT);
  options_content.insertBefore(SECTION_WRAPPER, options_content.lastElementChild);
};

// options_menu:          the dropdown Options-list
// toggleCallback:        hideAllArtifactsToggle function in content.js
// hideAllCheckboxValues: values for the stroke-dasharray attribute
export const createExportWindow = function (ARTIFACT_DATA, closeExportWindowCallback) {
  const WINDOW =
    document.createElement('div');
    WINDOW.id = 'exportWindow';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  const window_background = // element for the dark background
    document.createElement('div');
    window_background.classList.add(WINDOW_BACKGROUND);
    window_background.style.opacity = '1';
    WINDOW.appendChild(window_background);

  const window_center =
    document.createElement('div');
    window_center.classList.add(WINDOW_CENTER);
    WINDOW.appendChild(window_center);

  const window_modal =
    document.createElement('div');
    window_modal.classList.add(WINDOW_MODAL);
    window_modal.style = 'opacity: 1; pointer-events: all;';
    window_center.appendChild(window_modal);

  const schedule_creator =
    document.createElement('div');
    schedule_creator.classList.add(SCHEDULE_TASK_CREATOR);
    schedule_creator.style.width = '360px';
    window_modal.appendChild(schedule_creator);

  // TITLE
  const schedule_top_bar =
    document.createElement('div');
    schedule_top_bar.classList.add(SCHEDULE_TOP_BAR);
    schedule_top_bar.style = 'flex-direction: column;';
    schedule_top_bar.innerHTML = "<h3>Export Artifact Data</h3>";
    schedule_creator.appendChild(schedule_top_bar);

  const schedule_content =
    document.createElement('div');
    schedule_content.classList.add(SCHEDULE_TASK_CREATOR_CONTENT);
    schedule_content.style.padding = '0 10px 15px';
    schedule_creator.appendChild(schedule_content);

    schedule_content.appendChild(createSection(null, 'exportDataField', 'Export Data', null, ARTIFACT_DATA.replaceAll('"', "'")));

    const close_button =
      document.createElement('div');
      close_button.innerHTML = `
        <div class="${SCHEDULE_BUTTON_WRAPPER}">
          <button id="closeButton">Close</button>
        </div>`;
    close_button.querySelector('#closeButton').onclick = e => closeExportWindowCallback(e);
    schedule_content.appendChild(close_button);

  document.body.appendChild(WINDOW);
};
