import json
import os.path

import requests

# use the file location instead of the current working dir
# so the scripts can be called anywhere rather than only inside new_artifacts/
ARTIFACTS_DIR = os.path.dirname(__file__)
# possible locations for the dataset.json
DATASET_LOCATION = ["./dataset.json", "../src/dataset.json"]
# API url for artifact data
BASE_API_URL = "https://gi.yatta.moe/api/v2/en/reliquary"
# API url for artifact images
BASE_ASSET_URL = "https://gi.yatta.moe/assets/UI/reliquary/"


def get_dataset():
    """Go through the list of possible locations. If the file exists in a location, return the json data."""
    # DATASET_LOCATIONs are relative so make them absolute by using the file path rather than working path
    absolute_paths = [
        os.path.join(ARTIFACTS_DIR, path) for path in DATASET_LOCATION
    ]
    for path in absolute_paths:
        if os.path.isfile(path):
            with open(path) as file:
                return json.load(file)
    else:
        raise FileNotFoundError("Dataset was not found.")


def get_reliquary_data():
    """Fetch the list of artifact sets from yatta.moe"""
    r = requests.get(BASE_API_URL)
    data = r.json()["data"]["items"]
    return data


def get_artifact_data(id):
    """Get artifact data and set's pieces by set id"""
    r = requests.get(BASE_API_URL + "/" + str(id))
    data = r.json()["data"]
    return {
        "id": data["id"],
        "name": data["name"],
        "icon": data["icon"],
        "pieces": {
            "flower": data["suit"]["EQUIP_BRACER"],
            "plume": data["suit"]["EQUIP_NECKLACE"],
            "sands": data["suit"]["EQUIP_SHOES"],
            "goblet": data["suit"]["EQUIP_RING"],
            "circlet": data["suit"]["EQUIP_DRESS"],
        },
    }


def download_images(data):
    """Loop through the curated list of new artifacts and download images for each.
    The file name uses the same structure that `uploadToImgur.py` uses, so it can be used after."""
    for set_data in data:
        set_name = set_data["name"]
        pieces = set_data["pieces"]

        for type, piece in pieces.items():
            piece_name = piece["name"]
            icon = piece["icon"]
            image_url = BASE_ASSET_URL + "{}.png".format(icon)
            image_file_name = "{}_{}_{}.png".format(set_name, type, piece_name)

            print(
                "downloading {} of {}: {}".format(type, set_name, piece_name),
                end="",
            )
            # save image to the directory
            image_data = requests.get(image_url).content
            save_path = os.path.join(ARTIFACTS_DIR, image_file_name)
            with open(save_path, "wb") as file:
                file.write(image_data)
            print(" ---- DONE")


def main():
    # fetch data
    reliquary_data = get_reliquary_data()

    # filter out 3-4 star sets, and strip out unnecessary information
    set_data = []
    for _, v in reliquary_data.items():
        # keep only 5* sets
        if 5 not in v["levelList"]:
            continue

        obj = {
            "id": v["id"],
            "name": v["name"],
        }
        set_data.append(obj)

    # filter out sets that are already in the dataset
    old_dataset = get_dataset()
    set_data = list(
        filter(lambda x: x["name"] not in old_dataset.keys(), set_data)
    )

    # if there are no new sets, abort
    if not set_data:
        raise RuntimeError("Dataset already up to date")

    print("Fetching data for the following sets:")
    [print("- {}".format(x["name"])) for x in set_data]

    # add piece data to sets
    set_data = list(map(lambda x: get_artifact_data(x["id"]), set_data))

    download_images(set_data)


main()
