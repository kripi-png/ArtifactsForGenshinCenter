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
