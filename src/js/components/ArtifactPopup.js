// slot:                 hovered artifact
// x, y:                 location for the popup window
// set, piece:           names of the set and piece
export const ArtifactPopup = (slot, loc_x, loc_y, setName, pieceName) => {
  const ICON_URL = slot.style.backgroundImage
    .replaceAll('"', '')
    .replace('url(', '')
    .replace(')', '');
  const ARTIFACT_POPUP = document.createElement('div');
  ARTIFACT_POPUP.id = 'artifactTooltipWindow';
  ARTIFACT_POPUP.style = 'width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;';
  ARTIFACT_POPUP.innerHTML = `
    <div class="artifactTooltip" style="position: sticky; left: ${loc_x}px; top: ${loc_y}px;">
      <div class="tooltipTitle">
        <p class="tooltipTitleText">
          <span>${pieceName}</span><br />${setName}
        </p>
        <img src="${ICON_URL}" alt="${setName}-${pieceName}" class="tooltipTitleIcon" />
      </div>
      <div class="tooltipTextWrapper">
        <p class="tooltipText">
          Main Stat: ${slot.dataset.main}
        </p>
        <p class="tooltipText">
          Sub Stat: ${slot.dataset.sub}
        </p>
      </div>
    </div>
  `;

  return ARTIFACT_POPUP;
};
