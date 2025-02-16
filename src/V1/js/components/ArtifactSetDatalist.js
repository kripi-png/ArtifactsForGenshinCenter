export const ArtifactSetDatalist = ARTIFACT_SET_NAMES => {
  const datalist = document.createElement('datalist');
  datalist.id = 'artifactSelectorDatalist';

  ARTIFACT_SET_NAMES.forEach(set_name => {
    const _artifact = document.createElement('option');
    _artifact.value = set_name;
    datalist.appendChild(_artifact);
  });

  return datalist;
};
