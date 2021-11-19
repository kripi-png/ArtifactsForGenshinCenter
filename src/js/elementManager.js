
// piece:               name of the piece that was clicked, e.g. plume
// callback:            openArtifactEditor function in content.js
export const createSlot = function (piece, callback) {
  let SLOT =
    document.createElement('div');
    SLOT.classList.add('artifactSlot', piece+"Slot");
    SLOT.addEventListener('click', callback);
  return SLOT;
}

// ARTIFACT_SET_NAMES:  list of all artifact sets available
// inputType:           used to create the input field
// sectionName:         title for the input field
const createSection = function (ARTIFACT_SET_NAMES, inputType, sectionName, inputValue) {
  // classes and styling used mostly from the original website
  let SECTION =
    document.createElement('div');
    SECTION.classList.add('Schedule_section__6vicf');

  let section_name =
    document.createElement('p');
    section_name.classList.add('Schedule_sectionName__3vtrn');
    section_name.innerHTML = sectionName;
    SECTION.appendChild(section_name);

  let input_wrapper =
    document.createElement('div');
    input_wrapper.classList.add('Schedule_inputWrapper__GzY8Y');
    SECTION.appendChild(input_wrapper);

  let input_input =
    document.createElement('div');
    input_input.classList.add('Input_input__AuQWE');
    input_wrapper.appendChild(input_input);

  let input_glow =
    document.createElement('div');
    input_glow.classList.add('Input_glow__2lh0b');
    input_input.appendChild(input_glow);

  let input_innerborder =
    document.createElement('div');
    input_innerborder.classList.add('Input_innerborder__2Gail');
    input_input.appendChild(input_innerborder);

  let actual_input =
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

      case 'artifact_set_list':
        actual_input.id = 'selectArtifactInput';
        actual_input.placeholder = "Enter set name...";
        actual_input.setAttribute('list', 'artifactSelectorDatalist');
        actual_input.setAttribute('maxlength', '40');

        // datalist contains all possible artifact sets as options
        // and is inserted next to the artifact set input field
        let datalist =
        document.createElement('datalist');
        datalist.id = 'artifactSelectorDatalist';
        ARTIFACT_SET_NAMES.forEach(a => {
          let _artifact = document.createElement('option');
          _artifact.value = a;
          datalist.appendChild(_artifact);
        });
        input_input.appendChild(datalist);
        break;

      case 'checkbox':
        actual_input.id = 'artifactCheckbox';
        actual_input.type = 'checkbox';
        actual_input.style.margin = '0';
        actual_input.checked = true ? inputValue === 'true' : false; // fail-safe in case value is undefined

        input_input.style.width = '48px';
        input_input.style.marginLeft = 'calc(50% - 24px)';
        break;
    }
    input_input.appendChild(actual_input);

  return SECTION
}

// callback:            confirmArtifactEdit function in content.js
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
const createEditorButton = function (confirmArtifactEditCallback, deleteArtifactCallback, owner, piece) {
  // classes and styling used mostly from the original website
  let BUTTON_WRAPPER =
    document.createElement('div');
    BUTTON_WRAPPER.classList.add('Schedule_buttonsWrapper__3QM49');

  let deleteButton =
    document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = e => deleteArtifactCallback(e, owner, piece);
    BUTTON_WRAPPER.append(deleteButton)

  let createButton =
    document.createElement('button');
    createButton.innerHTML = "OK";
    createButton.onclick = e => confirmArtifactEditCallback(e, owner, piece);
    BUTTON_WRAPPER.append(createButton);


  return BUTTON_WRAPPER;
}

// slot                 artifact slot clicked
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
// callback:            confirmArtifactEdit function in content.js
export const createArtifactEditor = function (slot, ARTIFACT_SET_NAMES, owner, piece, confirmArtifactEditCallback, deleteArtifactCallback) {
  // classes and styling used mostly from the original website
  let WINDOW =
    document.createElement('div');
    WINDOW.id = 'artifactEdit';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  let window_window =
    document.createElement('div');
    window_window.classList.add('Window_window__2tU_Y');
    window_window.style.opacity = '1';
    WINDOW.appendChild(window_window);

  let window_center =
    document.createElement('div');
    window_center.classList.add('Window_center__1F9yr');
    WINDOW.appendChild(window_center);

  let window_modal =
    document.createElement('div');
    window_modal.classList.add('Window_modal__2xmK7');
    window_modal.style = 'opacity: 1; pointer-events: all;';
    window_center.appendChild(window_modal);

  let window_edit =
    document.createElement('div');
    window_edit.classList.add('Edit_edit___eEru');


  let schedule_creator =
    document.createElement('div');
    schedule_creator.classList.add('Schedule_taskCreator__2MSUu');
    schedule_creator.style.width = '360px';
    window_modal.appendChild(schedule_creator);

  let schedule_topBar =
    document.createElement('div');
    schedule_topBar.classList.add('Schedule_taskTopBar__2qHzE');
    schedule_topBar.innerHTML = "<h3>Edit Artifact</h3>";
    schedule_creator.appendChild(schedule_topBar);

  let schedule_content =
    document.createElement('div');
    schedule_content.classList.add('Schedule_taskCreatorContent__3zR8F');
    schedule_content.style.padding = '0 10px 15px';
    schedule_creator.appendChild(schedule_content);

    schedule_content.appendChild(createSection(ARTIFACT_SET_NAMES, 'artifact_set_list', "Set Name", slot.dataset.set));
    schedule_content.appendChild(createSection(null, 'main_stat', 'Main Stat', slot.dataset.main));
    schedule_content.appendChild(createSection(null, 'sub_stat', 'Sub Stat', slot.dataset.sub));
    schedule_content.appendChild(createSection(null, 'checkbox', 'Aquired?', slot.dataset.check));
    schedule_content.appendChild(createEditorButton(confirmArtifactEditCallback, deleteArtifactCallback, owner, piece));

  return WINDOW;
}

// slot:                 hovered artifact
// x, y:                 location for the popup window
// set, piece:           names of the set and piece
export const createTooltipBoxWrapper = function (slot, x, y, set, piece) {
  let _setName = set;
  let _pieceName = piece;
  let WINDOW =
    document.createElement('div');
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;';
    WINDOW.id = 'artifactTooltipWindow';

  let WRAPPER =
    document.createElement('div');
    WRAPPER.classList.add('artifactTooltip');

    WRAPPER.style.position = 'sticky';
    WRAPPER.style.left = x + "px";
    WRAPPER.style.top = y + "px";

  let titleBar = // wrapper for title text & icon
    document.createElement('div');
    titleBar.classList.add('tooltipTitle');
    WRAPPER.appendChild(titleBar);

  let titleText =
    document.createElement('p');
    titleText.classList.add('tooltipTitleText');
    titleText.innerHTML = `<span>${_pieceName}</span><br>${_setName}`
    titleBar.appendChild(titleText)

  let titleIcon = // yoink the title icon directly from the hovered element
    document.createElement('img');
    titleIcon.classList.add('tooltipTitleIcon');
    titleIcon.src = slot.style.backgroundImage.replaceAll('"', '').replace('url(', '').replace(')', '');
    titleBar.appendChild(titleIcon);

  let textWrapper = // wrapper for main stat & sub stat texts
    document.createElement('div');
    textWrapper.classList.add('tooltipTextWrapper')
    WRAPPER.appendChild(textWrapper);

  let main =
    document.createElement('p');
    main.classList.add('tooltipText');
    main.innerHTML = "Main Stat: " + slot.dataset.main;
    textWrapper.appendChild(main);

  let sub =
    document.createElement('p');
    sub.classList.add('tooltipText');
    sub.innerHTML = "Sub Stat: " + slot.dataset.sub;
    textWrapper.appendChild(sub);

  WINDOW.appendChild(WRAPPER);

  return WINDOW;
}


// panel:                 character panel
// owner:                 name of the character
// callback:              hidingButtonCallback function in content.js
export const createArtifactHidingButton = function (panel, owner, callback) {
  let BUTTON_WRAPPER =
    document.createElement('div');
    // get slotWrapper element by owner's name and check whether it has disabled class
    // set title using ternary operator based on that value
    BUTTON_WRAPPER.title =
        panel.querySelector(`.artifactSlotsWrapper[data-character=${owner}]`)
        .classList.contains('disabled')
          ? 'Show Artifacts'
          : 'Hide Artifacts';
    BUTTON_WRAPPER.classList.add('ItemPanel_buttonWrapper__T2Pof');
    BUTTON_WRAPPER.style.right = '80px';
    BUTTON_WRAPPER.dataset.character = owner;
    // not quite sure why but without this line the button stays focused and
    // the buttons won't disappear when panel is unhovered
    BUTTON_WRAPPER.onmousedown = e => e.preventDefault();

  let button =
    document.createElement('button');
    button.classList.add('CircleButton_button__2q1kt');
    button.onclick = e => callback(e);
    BUTTON_WRAPPER.appendChild(button);

  let button_glow =
    document.createElement('div');
    button_glow.classList.add('CircleButton_glow__19phK');
    button.appendChild(button_glow);
  let button_innerborder =
    document.createElement('div');
    button_innerborder.classList.add('CircleButton_innerborder__2HyhF');
    button.appendChild(button_innerborder);
  let button_inner =
    document.createElement('div');
    button_inner.classList.add('CircleButton_inner__2223j');
    button.appendChild(button_inner);

  let button_image =
    document.createElement('img');
    button_image.src = 'https://i.imgur.com/liC3uM6.png';
    button.appendChild(button_image);

  let bar = panel.querySelector('.ItemPanel_item__38QUF')
  bar.insertBefore(BUTTON_WRAPPER, bar.querySelector('div[title=Active]'));
}
