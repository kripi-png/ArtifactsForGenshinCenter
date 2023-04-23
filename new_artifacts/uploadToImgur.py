# by kripi-png
# uploads all .png images to imgur
# and saves set name, type, piece name, and imgur image id to new_artifacts.json
# file format:
# { "set_name": [["flower_name", "image_id"], ["plume_name", "image_id"], ... ] }

import os
import json
import requests

from dotenv import load_dotenv
from imgurpython import ImgurClient
from imgurpython.helpers.error import ImgurClientError

load_dotenv()

# get yours and save in .env
CLIENT_ID = os.getenv("IMGUR_CLIENT")
CLIENT_SECRET = os.getenv("IMGUR_SECRET")
client = ImgurClient(CLIENT_ID, CLIENT_SECRET)

images = {}

for filename in os.listdir('.'):
  if filename.endswith('.png'):
    try:
      image = client.upload_from_path('./' + filename)
    except ImgurClientError as e:
      print(e.error_message)
      print(e.status_code)

    indexByType = { "flower": 0, "plume": 1, "sands": 2, "goblet": 3, "circlet": 4 }

    set, type, name = filename.split('.')[0].split('_')
    if type not in indexByType.keys():
        raise Exception("Invalid type: " + type + " in file " + filename)

    if not set in images:
        images[set] = [[],[],[],[],[]]

    index = indexByType[type]
    images[set][index] = [ name, image['id'] ]
    print(name, image['id'])

with open('new_artifacts.json', 'w') as f:
  json.dump(images, f)
