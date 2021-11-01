export const createSlot = function (type, clickCallback) {
  let SLOT =
    document.createElement('div');
    SLOT.classList.add('artifactSlot', type+"Slot");
    SLOT.addEventListener('click', clickCallback);
  return SLOT;
}

const createArtifactInputWrapper = function (ARTIFACT_SET_NAMES) {
  let WRAPPER =
    document.createElement('div');
    WRAPPER.id = 'artifactInputWrapper';

  let title =
    document.createElement('p');
    title.innerHTML = "Select Artifact Set";
    WRAPPER.appendChild(title);

  let input =
    document.createElement('input');
    input.setAttribute('list', 'artifactSelectorDatalist');
    input.id = "selectArtifactInput";
    WRAPPER.appendChild(input);

  let datalist =
    document.createElement('datalist');
    datalist.id = 'artifactSelectorDatalist';
    ARTIFACT_SET_NAMES.forEach(a => {
      let _artifact = document.createElement('option');
      _artifact.value = a;
      datalist.appendChild(_artifact);
    });
    WRAPPER.appendChild(datalist);

  return WRAPPER;
}

const createMainStatWrapper = function () {
  let WRAPPER =
    document.createElement('div');
    WRAPPER.id = 'mainStatDiv';

  let text =
    document.createElement('p');
    text.innerHTML = "Enter Main Stat";
    WRAPPER.appendChild(text);

  let input =
    document.createElement('input');
    WRAPPER.appendChild(input);

  return WRAPPER;
}

const createSubStatWrapper = function () {
  let WRAPPER =
    document.createElement('div');
    WRAPPER.id = 'subStatDiv';

  let text =
    document.createElement('p');
    text.innerHTML = "Enter Sub Stat";
    WRAPPER.appendChild(text);

  let input =
    document.createElement('input');
    WRAPPER.appendChild(input);

  return WRAPPER;
}

// callback:            confirmArtifactEdit function in content.js
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
const createEditorButton = function (confirmArtifactEditCallback, owner, piece) {
  let BUTTON =
    document.createElement('button');
    BUTTON.innerHTML = "OK";
    BUTTON.onclick = e => confirmArtifactEditCallback(e, owner, piece);

  return BUTTON;
}

// slot                 artifact slot clicked
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// owner:               character whose artifact slot was clicked
// piece:               name of the piece that was clicked, e.g. plume
// callback:            confirmArtifactEdit function in content.js
export const createArtifactEditor = function (slot, ARTIFACT_SET_NAMES, owner, piece, confirmArtifactEditCallback) {
  let WINDOW =
    document.createElement('div');
    WINDOW.id = 'artifactEdit';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  let title =
    document.createElement('h3');
    title.innerHTML = `${owner}'s ${piece}`;
    WINDOW.appendChild(title);

  WINDOW.appendChild(createArtifactInputWrapper(ARTIFACT_SET_NAMES));
  WINDOW.appendChild(createMainStatWrapper());
  WINDOW.appendChild(createSubStatWrapper());
  WINDOW.appendChild(createEditorButton(confirmArtifactEditCallback, owner, piece));

  return WINDOW;
}

// slot: hovered artifact
// x, y: location for the popup window
// set, piece: names of the set and piece
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
