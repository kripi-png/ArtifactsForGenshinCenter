import requests
import json

parseType = {"Flower of Life":"flower","Plume of Death":"plume","Sands of Eon":"sands","Goblet of Eonothem":"goblet","Circlet of Logos":"circlet",}

artifacts = requests.get('https://impact.moe/api/artifacts/').json()

data = {}
for artifact in artifacts:
    set = artifact['artifactSet']['name']
    type = parseType[artifact['type']]

    if not set in data:
        data[set] = {}
    data[set][type] = {'name': artifact['name'], 'image': artifact['image'],}

f = open('../js/dataset.json', 'w')
json.dump(data, f)
f.close()
