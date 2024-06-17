### INSTRUCTIONS FOR ADDING A NEW ARTIFACT SET
1. Download all images for the artifact set and place them in this directory
    - You can find the images for example from https://ambr.top/en/archive/reliquary. God bless them.

2. Rename the files in this format: SET_TYPE_NAME.png
  - type can be flower, plume, sands, goblet, or circlet
  - So, for example, **Flower of Paradise Lost_plume_Wilting Feast.png**

3. Create a dotenv file (literally .env)
  - You need a Client ID and secret for Imgur API.
  
  1. Create an Imgur account and log in
  
  2. Access https://api.imgur.com/oauth2/addclient
  
  3. Follow instructions here: https://dubble.so/guides/how-to-get-imgur-client-id-purlxhv84a0m3mlsiak7
  
  4. After getting your Client ID and Client Secret, add them to the .env file similarily to the example below

  ![](https://i.imgur.com/8R9vJTk.png)

4. Run uploadToImgur.py to generate new_artifacts.json file.

5. Copy/paste the real dataset from /src to this directory

6. Run updateDataset.py to combine new_artifacts.json into dataset.json.
  This will not generate a new file but instead edits dataset.json so a backup may be in order.

7. Copy/paste dataset.json back to /src and test the new artifacts are available and work on the planner
