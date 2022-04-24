import { setInputValue } from './helpers.js';
import { Section } from './Section.js';

// slot                 clicked artifact slot
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// character:           character whose artifact was clicked
// piece:               name of the piece that was clicked, e.g. plume
// callback:            confirmArtifactEdit function in content.js
export const ArtifactEditor = (slot, ARTIFACT_SET_NAMES, character, piece, confirmCallback, deleteCallback ) => {
  const artifact_set = slot.dataset.set;
  const main_stat = slot.dataset.main;
  const sub_stat = slot.dataset.sub;
  const checked = slot.dataset.sub;

  const EDITOR_WINDOW = document.createElement('div');
  EDITOR_WINDOW.id = 'artifactEdit';
  EDITOR_WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';
  EDITOR_WINDOW.innerHTML = `
    <div class="Window_window__0zdsm" style="opacity: 1;"></div>
    <div class="Window_center__oA34u">
      <div class="Window_modal__2s0yi" style="opacity: 1; pointer-events: all;">
        <div class="Schedule_taskCreator__bA_eq" style="width: 360px;">
          <div class="Schedule_taskTopBar__lV1W8" style="flex-direction: column;">
            <h3>Edit Artifact</h3>
            <h4 style="padding-bottom: 10px; text-transform: capitalize;">${character}'s ${piece}</h4>
          </div>
          <div class="Schedule_taskCreatorContent__3tCoD" style="padding: 0 10px 15px">
            ${Section(ARTIFACT_SET_NAMES, 'selectArtifactInput', 'Set Name', 'Enter set name...').outerHTML}
            ${Section(null, 'artifactMainStat', 'Main Stat', 'Enter main stat...').outerHTML}
            ${Section(null, 'artifactSubStat', 'Sub Stat', 'Enter sub stat(s)...').outerHTML}
            ${Section(null, 'artifactCheckbox', 'Obtained in-game?', null).outerHTML}
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

  // set values
  setInputValue(EDITOR_WINDOW, '#selectArtifactInput', artifact_set);
  setInputValue(EDITOR_WINDOW, '#artifactMainStat', main_stat);
  setInputValue(EDITOR_WINDOW, '#artifactSubStat', sub_stat);
  setInputValue(EDITOR_WINDOW, '#artifactCheckbox', checked);

  // add callbacks
  EDITOR_WINDOW.querySelector('#editorBtnDelete').onclick = e => deleteCallback(e, character, piece);
  EDITOR_WINDOW.querySelector('#editorBtnConfirm').onclick = e => confirmCallback(e, character, piece);

  return EDITOR_WINDOW;
};
