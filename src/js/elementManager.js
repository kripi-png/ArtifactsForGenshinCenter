export const createSlot = function (type, title, clickCallback) {
  let slot = document.createElement('div');
  slot.classList.add('artifactSlot', type);
  slot.title = title;
  slot.addEventListener('click', clickCallback);
  return slot;
}
