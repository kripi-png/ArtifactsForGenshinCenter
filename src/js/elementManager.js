export const createSlot = function (type, title, clickCallback) {
  let SLOT =
    document.createElement('div');
    SLOT.classList.add('artifactSlot', type);
    SLOT.title = title;
    SLOT.addEventListener('click', clickCallback);
  return SLOT;
}

const createArtifactInputWrapper = function () {
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
    ['Pale Flame', 'Adventurer', 'Exile'].forEach(a => {
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

const createEditorButton = function (callback) {
  let BUTTON =
    document.createElement('button');
    BUTTON.innerHTML = "OK";
    BUTTON.onclick = callback;

  return BUTTON
}



export const createArtifactEditor = function (slot, owner, type, callback) {
  let WINDOW =
    document.createElement('div');
    WINDOW.id = 'artifactEdit';
    WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';

  let title =
    document.createElement('h3');
    title.innerHTML = `${owner}'s ${type}`;
    WINDOW.appendChild(title);

  WINDOW.appendChild(createArtifactInputWrapper())
  WINDOW.appendChild(createMainStatWrapper())
  WINDOW.appendChild(createSubStatWrapper())
  WINDOW.appendChild(createEditorButton(callback))

  return WINDOW
}
