import { setInputValue } from "../helpers.js";

import { ARTIFACT_DATA, saveToLocalStorage } from "../dataManager.js";

import { loadArtifact, getArtifactSlotByOwner } from "../artifactRenderer.js";

const confirmArtifactEdit = function (event, owner, type) {
  const set = document.querySelector("#selectArtifactInput").value;
  const main = document.querySelector("#artifactMainStat").value;
  const sub = document.querySelector("#artifactSubStat").value;
  const check = document.querySelector("#artifactCheckbox").checked;

  if (!ARTIFACT_DATA[owner]) {
    ARTIFACT_DATA[owner] = {};
  }
  ARTIFACT_DATA[owner][type] = { set: set, main: main, sub: sub, check: check };

  saveToLocalStorage("userArtifactData", ARTIFACT_DATA);
  loadArtifact(owner, type);

  const editor = document.querySelector("#artifactEdit");
  editor.parentNode.removeChild(editor); // delete the editor element once artifact is selected
};

const deleteArtifact = function (event, owner, type) {
  if (ARTIFACT_DATA[owner]) {
    delete ARTIFACT_DATA[owner][type];
  }

  const slot = getArtifactSlotByOwner(owner, type);
  if (!slot) {
    return;
  }

  slot.dataset.set = "";
  slot.dataset.main = "";
  slot.dataset.sub = "";
  slot.dataset.check = "";
  slot.style.backgroundImage = "";
  slot.classList.remove("check");

  slot.onmouseover = () => false;
  slot.onmouseleave = () => false;

  // console.log(ARTIFACT_DATA[owner]);

  saveToLocalStorage("userArtifactData", ARTIFACT_DATA);
  loadArtifact(owner, type);

  const editor = document.querySelector("#artifactEdit");
  editor.parentNode.removeChild(editor); // delete the editor element once artifact is selected
};

// slot                 clicked artifact slot
// ARTIFACT_SET_NAMES:  list of all artifact sets available
// character:           character whose artifact was clicked
// piece:               name of the piece that was clicked, e.g. plume
export const ArtifactEditor = (slot, ARTIFACT_SET_NAMES, character, piece) => {
  const artifact_set = slot.dataset.set;
  const main_stat = slot.dataset.main;
  const sub_stat = slot.dataset.sub;
  const checked = slot.dataset.check;

  const EDITOR_WINDOW = document.createElement("div");
  EDITOR_WINDOW.id = "artifactEdit";
  EDITOR_WINDOW.style =
    "width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;";
  EDITOR_WINDOW.innerHTML = `
    <div class="Window_window__0zdsm" style="opacity: 1;">
      <div class="Window_modal__2s0yi" style="opacity: 1; pointer-events: all;">
        <div class="Schedule_taskCreator__bA_eq">
          <div class="Schedule_taskTopBar__lV1W8" style="flex-direction: column;">
            <h3>Edit Artifact</h3>
            <h4 style="padding-bottom: 10px; text-transform: capitalize;">
              ${character}'s ${piece}
            </h4>
          </div>
          <div class="Schedule_taskCreatorContent__3tCoD" style="padding: 0 10px 15px">
            ${Section(ARTIFACT_SET_NAMES, "selectArtifactInput", "Set Name", "Enter set name...").outerHTML}
            ${Section(null, "artifactMainStat", "Main Stat", "Enter main stat...").outerHTML}
            ${Section(null, "artifactSubStat", "Sub Stat", "Enter sub stat(s)...").outerHTML}
            ${Section(null, "artifactCheckbox", "Already obtained", null).outerHTML}
            <div class="Ascension_missing__FaHoD" style="font-size: 16px; color: #f54c4c; margin-bottom: 30px;">
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
  setInputValue(EDITOR_WINDOW, "#selectArtifactInput", artifact_set);
  setInputValue(EDITOR_WINDOW, "#artifactMainStat", main_stat);
  setInputValue(EDITOR_WINDOW, "#artifactSubStat", sub_stat);
  setInputValue(EDITOR_WINDOW, "#artifactCheckbox", checked);

  // add callbacks
  EDITOR_WINDOW.querySelector("#editorBtnDelete").onclick = (e) =>
    deleteArtifact(e, character, piece);
  EDITOR_WINDOW.querySelector("#editorBtnConfirm").onclick = (e) =>
    confirmArtifactEdit(e, character, piece);

  return EDITOR_WINDOW;
};
