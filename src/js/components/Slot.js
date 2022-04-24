// piece:               name of the piece that was clicked, e.g. plume
// callback:            openArtifactEditor function in content.js
export const Slot = (piece, callback) => {
  const SLOT = document.createElement('div');
  SLOT.classList.add('artifactSlot', piece + 'Slot');
  SLOT.addEventListener('click', callback);

  return SLOT;
};
