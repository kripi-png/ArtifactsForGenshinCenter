// calculates the location of the hover pop up in relation to the hovered slot
const calculatePopupLocation = function (slot) {
  const rect = slot.getBoundingClientRect();
  const x = rect.left + slot.getBoundingClientRect().width;
  const y = rect.bottom - rect.height;

  return { x, y };
};

// slot:                 hovered artifact
// set, piece:           names of the set and piece
const ArtifactPopup = (slot, setName, pieceName) => {
  const { x: loc_x, y: loc_y } = calculatePopupLocation(slot);

  const ICON_URL = slot.style.backgroundImage
    .replaceAll('"', "")
    .replace("url(", "")
    .replace(")", "");
  const ARTIFACT_POPUP = document.createElement("div");
  ARTIFACT_POPUP.id = "artifactTooltipWindow";
  ARTIFACT_POPUP.style =
    "width: 100vw; z-index: 10000; position: absolute; inset: 0px; pointer-events: none;";
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
