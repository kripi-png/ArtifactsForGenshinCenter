# by kripi-png
# combines dataset.json and new_artifacts.json
# does not generate a new json but edits dataset.json

import json

updated = []

# read the real file
with open('./dataset.json', 'r+') as f:
    data = json.load(f)
    f.seek(0)

    # open the file containing the artifacts to be added
    with open('./new_artifacts.json', 'r') as f2:
        new_data = json.load(f2)

        for set in new_data:
            data[set] = new_data[set]
            updated.append(set)

    json.dump(data, f)
    f.truncate()

print("Added the following sets: ")
[print("-", set) for set in updated]
