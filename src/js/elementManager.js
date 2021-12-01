// piece:               name of the piece that was clicked, e.g. plume
// callback:            openArtifactEditor function in content.js
export const createSlot = function (piece, callback) {
  const SLOT =
    document.createElement('div');
    SLOT.classList.add('artifactSlot', piece + 'Slot');
    SLOT.addEventListener('click', callback);
  return SLOT;
};

// ARTIFACT_SET_NAMES:  list of all artifact sets available
// inputType:           used to create the input field
// sectionName:         title for the input field
const createSection = function (ARTIFACT_SET_NAMES, inputType, sectionName, inputValue) {
  // classes and styling used mostly from the original website
  const SECTION =
    document.createElement('div');
    SECTION.classList.add('Schedule_section__6vicf');

  const section_name =
    document.createElement('p');
    section_name.classList.add('Schedule_sectionName__3vtrn');
    section_name.innerHTML = sectionName;
    SECTION.appendChild(section_name);

  const input_wrapper =
    document.createElement('div');
    input_wrapper.classList.add('Schedule_inputWrapper__GzY8Y');
    SECTION.appendChild(input_wrapper);

  const input_input =
    document.createElement('div');
    input_input.classList.add('Input_input__AuQWE');
    input_wrapper.appendChild(input_input);

  const input_glow =
    document.createElement('div');
    input_glow.classList.add('Input_glow__2lh0b');
    input_input.appendChild(input_glow);

  const input_innerborder =
    document.createElement('div');
    input_innerborder.classList.add('Input_innerborder__2Gail');
    input_input.appendChild(input_innerborder);

  const actual_input =
    document.createElement('input');
    actual_input.classList.add('Input_inner__3ObeW');
    actual_input.name = 'name'; actual_input.type = 'text';
    actual_input.style = 'font-size: 16px; color: black;';
    actual_input.setAttribute('maxlength', '20');
    actual_input.value = inputValue || '';

    // as the function is same for all sections,
    // inputType parameter is used to determine how the input field is created
    switch (inputType) {
      case 'main_stat':
        actual_input.id = 'artifactMainStat';
        actual_input.placeholder = "Enter main stat...";
        break;

      case 'sub_stat':
        actual_input.id = 'artifactSubStat';
        actual_input.placeholder = "Enter sub stat(s)";
        break;

      case 'artifact_set_list': {
        actual_input.id = 'selectArtifactInput';
        actual_input.placeholder = "Enter set name...";
        actual_input.setAttribute('list', 'artifactSelectorDatalist');
        actual_input.setAttribute('maxlength', '40');

        // datalist contains all possible artifact sets as options
        // and is inserted next to the artifact set input field
        const datalist =
          document.createElement('datalist');
          datalist.id = 'artifactSelectorDatalist';

        ARTIFACT_SET_NAMES.forEach(a => {
          const _artifact = document.createElement('option');
          _artifact.value = a;
          datalist.appendChild(_artifact);
        });
        input_input.appendChild(datalist);
        break;
      }

      case 'checkbox':
        actual_input.id = 'artifactCheckbox';
        actual_input.type = 'checkbox';
        actual_input.style.margin = '0';
        actual_input.checked = inputValue === 'true';

        input_input.style.width = '48px';
        input_input.style.marginLeft = 'calc(50% - 24px)';
        break;
    }
    input_input.appendChild(actual_input);

  return SECTION;
};

// callback:            confirmArtifactEdit function in content.js
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
const createEditorButton = function (confirmArtifactEditCallback, deleteArtifactCallback, owner, piece) {
  // classes and styling used mostly from the original website
  const BUTTON_WRAPPER =
    document.createElement('div');
    BUTTON_WRAPPER.classList.add('Schedule_buttonsWrapper__3QM49');

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
  // classes and styling used mostly from the original website
  const WINDOW =
    document.createElement('div');
    WINDOW.id = 'artifactEdit';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  const window_window = // element for the dark background behind the actual editor
    document.createElement('div');
    window_window.classList.add('Window_window__2tU_Y');
    window_window.style.opacity = '1';
    WINDOW.appendChild(window_window);

  const window_center =
    document.createElement('div');
    window_center.classList.add('Window_center__1F9yr');
    WINDOW.appendChild(window_center);

  const window_modal =
    document.createElement('div');
    window_modal.classList.add('Window_modal__2xmK7');
    window_modal.style = 'opacity: 1; pointer-events: all;';
    window_center.appendChild(window_modal);

  const window_edit =
    document.createElement('div');
    window_edit.classList.add('Edit_edit___eEru');

  const schedule_creator =
    document.createElement('div');
    schedule_creator.classList.add('Schedule_taskCreator__2MSUu');
    schedule_creator.style.width = '360px';
    window_modal.appendChild(schedule_creator);

  // TITLE
  const schedule_top_bar =
    document.createElement('div');
    schedule_top_bar.classList.add('Schedule_taskTopBar__2qHzE');
    schedule_top_bar.style = 'flex-direction: column;';
    schedule_top_bar.innerHTML =
        `<h3>Edit Artifact</h3>
        <h4 style="padding-bottom: 10px; text-transform: capitalize;">${owner}'s ${piece}</h4>`;
    schedule_creator.appendChild(schedule_top_bar);

  const schedule_content =
    document.createElement('div');
    schedule_content.classList.add('Schedule_taskCreatorContent__3zR8F');
    schedule_content.style.padding = '0 10px 15px';
    schedule_creator.appendChild(schedule_content);

    schedule_content.appendChild(createSection(ARTIFACT_SET_NAMES, 'artifact_set_list', 'Set Name', slot.dataset.set));
    schedule_content.appendChild(createSection(null, 'main_stat', 'Main Stat', slot.dataset.main));
    schedule_content.appendChild(createSection(null, 'sub_stat', 'Sub Stat', slot.dataset.sub));
    schedule_content.appendChild(createSection(null, 'checkbox', 'Acquired?', slot.dataset.check));
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
    BUTTON_WRAPPER.classList.add('ItemPanel_buttonWrapper__T2Pof');
    BUTTON_WRAPPER.style.right = '80px';
    BUTTON_WRAPPER.dataset.character = owner;
    // not quite sure why but without this line the button stays focused and
    // the buttons won't disappear when panel is unhovered
    BUTTON_WRAPPER.onmousedown = e => e.preventDefault();

  const button =
    document.createElement('button');
    button.classList.add('CircleButton_button__2q1kt');
    button.onclick = e => callback(e);
    BUTTON_WRAPPER.appendChild(button);

  const button_glow =
    document.createElement('div');
    button_glow.classList.add('CircleButton_glow__19phK');
    button.appendChild(button_glow);
  const button_innerborder =
    document.createElement('div');
    button_innerborder.classList.add('CircleButton_innerborder__2HyhF');
    button.appendChild(button_innerborder);
  const button_inner =
    document.createElement('div');
    button_inner.classList.add('CircleButton_inner__2223j');
    button.appendChild(button_inner);

  const button_image =
    document.createElement('img');
    button_image.width = 18;
    button_image.height = 18;
    button_image.src = 'https://i.imgur.com/liC3uM6.png';
    button.appendChild(button_image);

  const bar = panel.querySelector('.ItemPanel_item__38QUF');
  // div[title=Active] is the disable/enable button
  bar.insertBefore( BUTTON_WRAPPER, bar.querySelector('div[title=Active]') );
};

// options_window:        div#options element
// importCallback:        importArtifactData function in content.js
// exportCallback:        exportArtifactData function in content.js
export const addExportImportToOptionsWindow = function (options_window, importCallback, exportCallback) {
  const OPTION_SECTION =
    document.createElement('div');
    OPTION_SECTION.classList.add('PlannerOptions_section__3lgqe');

  const WRAPPER =
    document.createElement('div');
    WRAPPER.classList.add('Radio_radio__1S7b1');
    OPTION_SECTION.appendChild(WRAPPER);

  const title =
    document.createElement('div');
    title.classList.add('Radio_radioLabel__3ECTP');
    title.innerHTML = "Extension Setting: Import / Export Artifact Data";
    WRAPPER.appendChild(title);

  const button_wrapper =
    document.createElement('div');
    button_wrapper.classList.add('Radio_options__1lESR', 'import_export_wrapper');
    button_wrapper.style = 'max-width: 440px';
    WRAPPER.appendChild(button_wrapper);

  const import_button =
    document.createElement('button');
    import_button.classList.add('Radio_option__27kFi');
    import_button.title = "Import Data";
    import_button.onclick = () => importCallback();
    import_button.innerHTML =
      "<div class='Radio_selected__1QOl-' style='visibility: visible; opacity: 1;" +
      "transform-origin: 50% 50% 0px;'></div>" +
      "Import Data";
    button_wrapper.appendChild(import_button);

  const export_button =
    document.createElement('button');
    export_button.classList.add('Radio_option__27kFi');
    export_button.title = "Export Data";
    export_button.onclick = () => exportCallback();
    export_button.innerHTML = "Export Data";
    button_wrapper.appendChild(export_button);

  options_window.querySelector('.PlannerOptions_content__T5_lg').appendChild(OPTION_SECTION);
};

// options_menu:          the dropdown Options-list
// hideAllArtifacts:      importArtifactData function in content.js
export const createShowAllArtifactCheckbox = function (options_menu, toggleCallback, currentMode) {
  console.log(currentMode);
  const BUTTON_SECTION =
    document.createElement('div');
    BUTTON_SECTION.classList.add('PlannerOptions_quickSection__QP_pF');
    BUTTON_SECTION.innerHTML =
      `<div class="PlannerOptions_titleWrapper__35VjC">Extension Settings</div>
      <div class="Checkbox_checkbox__3JC7e">
        <h3>Show all artifacts</h3>
        <div class="Checkbox_buttonWrapper__1Q0kT">
          <button>
            <svg class="Checkbox_checkmark__wYzQF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <path id="toggleVisibilityCheckboxPath" class="Checkbox_checkmarkCheck__35cAh" d="m14 27 7 7 16-16" stroke-dashoffset="0px" stroke-dasharray=''></path>
            </svg>
          </button>
        </div>
      </div>`;

    // set the dasharray attribute afterwards as for some reason it
    // turns to <path stroke-dasharray='0x' [rest as attribute name]>
    // because of the space
    BUTTON_SECTION.querySelector('.Checkbox_checkmarkCheck__35cAh').setAttribute('stroke-dasharray', currentMode);
    // assign the callback function
    BUTTON_SECTION.querySelector('button').onclick = () => toggleCallback();

  // last element is the More Options button
  options_menu.insertBefore(BUTTON_SECTION, options_menu.lastElementChild);
};
