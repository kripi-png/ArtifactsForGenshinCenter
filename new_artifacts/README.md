### INSTRUCTIONS FOR ADDING A NEW ARTIFACT SET
1. Setup the .env file
    1. Create an Imgur account and log in

    2. Access https://api.imgur.com/oauth2/addclient

    3. Follow instructions here: https://dubble.so/guides/how-to-get-imgur-client-id-purlxhv84a0m3mlsiak7

    4. Create a .env file in the `./new_artifacts` directory

    5. After getting your Client ID and Client Secret, add them to the .env file similarily to the example below

    ![](https://i.imgur.com/8R9vJTk.png)

2. Run `1_scraper.py` to check for new artifacts and download their images if necessary.
    - They will be saved in the `new_artifacts` directory in `set_type_name.png` format.

3. Run `2_uploadToImgur.py` to upload all images to Imgur and generate `new_artifacts.json` file.
    - This uses the credentials in .env-file. The `new_artifacts.json` file has the same format as `./src/dataset.json`.

4. Run `3_updateDataset.py` to combine new_artifacts.json into a copy of dataset.json.
    - This will copy `./src/dataset.json` to `./new_artifacts/dataset.json` and modify that.

5. Move the edited `dataset.json` back into `./src` and replace the previous. It now has the new artifacts added to it.

6. Remove the downloaded images from `./new_artifacts` directory. Remove the `new_artifacts.json` file as well as the `./new_artifacts/dataset.json` if it stille exists.

7. Commit and create a PR.
