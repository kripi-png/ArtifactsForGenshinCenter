### INSTRUCTIONS FOR ADDING A NEW ARTIFACT SET
1. Download all images for the artifact set and place them in this directory
2. Rename the files in this format: SET_TYPE_NAME.png
  - type can be flower, plume, sands, goblet, or circlet
  - So, for example, **Flower of Paradise Lost_plume_Wilting Feast.png**
3. Run uploadToImgur.py to generate new_artifacts.json file.
4. Copy/paste the real dataset from /src to this directory
5. Run updateDataset.py to combine new_artifacts.json into dataset.json.
  This will not generate a new file but instead edits dataset.json so a backup may be in order.
6. Copy/paste dataset.json back to /src and test the new artifacts are available and work on the planner
