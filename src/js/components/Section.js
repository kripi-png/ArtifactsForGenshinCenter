import { createArtifactSetDatalist } from './ArtifactSetDatalist.js';

// ARTIFACT_SET_NAMES:  list of all artifact sets available
// inputType:           used to create the input field
// sectionName:         title for the input field
export const createSection = (ARTIFACT_SET_NAMES, inputType, sectionName, placeholder) => {
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

  // checkbox (Obtained)
  else if ( inputType === 'artifactCheckbox' ) {
    INPUT_FIELD.type = 'checkbox';
    INPUT_FIELD.style.margin = '0';

    INPUT_INPUT.style.width = '48px';
    INPUT_INPUT.style.marginLeft = 'calc(50% - 24px)';
  }

  return SECTION;
};
