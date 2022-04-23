import { setInputValue } from './helpers.js';
import { createSection } from './Section.js';

// options_menu:          the dropdown Options-list
// toggleCallback:        hideAllArtifactsToggle function in content.js
// hideAllCheckboxValues: values for the stroke-dasharray attribute
export const createExportWindow = (ARTIFACT_DATA, closeExportWindowCallback) => {
  const EXPORT_WINDOW = document.createElement('div');
  EXPORT_WINDOW.id = 'exportWindow';
  EXPORT_WINDOW.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: all;';
  EXPORT_WINDOW.innerHTML = `
    <div class="Window_window__0zdsm" style="opacity: 1;"></div>
    <div class="Window_center__oA34u">
      <div class="Window_modal__2s0yi" style="opacity: 1; pointer-events: all;">
        <div class="Schedule_taskCreator__bA_eq" style="width: 360px;">
          <div class="Schedule_taskTopBar__lV1W8" style="flex-direction: column;">
            <h3>Export Artifact Data</h3>
          </div>
          <div class="Schedule_taskCreatorContent__3tCoD" style="padding: 0 10px 15px;">
            ${createSection(null, 'exportDataField', 'Export Data', null).outerHTML}
            <div>
              <div class="Schedule_buttonsWrapper__fdOV_">
                <button id="closeButton">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  // set export field value
  setInputValue(EXPORT_WINDOW, '#exportDataField', ARTIFACT_DATA);

  // add callback
  EXPORT_WINDOW.querySelector('#closeButton').onclick = e => closeExportWindowCallback(e);

  document.body.appendChild(EXPORT_WINDOW);
};
