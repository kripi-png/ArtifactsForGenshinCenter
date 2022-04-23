import { setInputValue } from './helpers.js';
import { createSection } from './Section.js';

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
            <h4 style="padding-bottom: 10px; text-transform: capitalize;">${owner}'s ${piece}</h4>
          </div>
          <div class="Schedule_taskCreatorContent__3tCoD" style="padding: 0 10px 15px">
            ${createSection(ARTIFACT_SET_NAMES, 'selectArtifactInput', 'Set Name', 'Enter set name...').outerHTML}
            ${createSection(null, 'artifactMainStat', 'Main Stat', 'Enter main stat...').outerHTML}
            ${createSection(null, 'artifactSubStat', 'Sub Stat', 'Enter sub stat(s)...').outerHTML}
            ${createSection(null, 'artifactCheckbox', 'Obtained in-game?', null).outerHTML}
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
  // main container, input selector, value
  setInputValue(EDITOR_WINDOW, '#selectArtifactInput', slot.dataset.set);
  setInputValue(EDITOR_WINDOW, '#artifactMainStat', slot.dataset.main);
  setInputValue(EDITOR_WINDOW, '#artifactSubStat', slot.dataset.sub);
  setInputValue(EDITOR_WINDOW, '#artifactCheckbox', slot.dataset.check);

  // add callbacks
  EDITOR_WINDOW.querySelector('#editorBtnDelete').onclick = e => deleteArtifactCallback(e, owner, piece);
  EDITOR_WINDOW.querySelector('#editorBtnConfirm').onclick = e => confirmArtifactEditCallback(e, owner, piece);

  return EDITOR_WINDOW;
};
