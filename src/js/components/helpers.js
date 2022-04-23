export const setInputValue = (WINDOW, selector, value) => {
  const INPUT_FIELD = WINDOW.querySelector(selector);
  if ( selector === '#artifactCheckbox') {
    // convert string to boolean
    INPUT_FIELD.checked = JSON.parse(value || 'false');
    return;
  }

  INPUT_FIELD.value = value || '';
};
