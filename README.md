A chrome extension for [Genshin Center's Ascension Planner](https://genshin-center.com/planner) that allows users to add artifacts and set their stats.

### NOTE: This is an unofficial extension developed by me, kripi, and **NOT** Genshin Center.



![Ningguang's Artifacts](https://i.imgur.com/aZwUY54.png "Ningguang's Artifacts")
![Edit window](https://i.imgur.com/X4QRLsH.png)

## Todo
- Include the artifact type and character's name in the title of the edit window (e.g. Edit Ningguang's Plume)
- Rework the dataset.json to use numeric keys instead (requires less space)
- Rework the save system to use numeric indexes instead (requires less space)

## Known issues
- Adding a new character does not create artifact slots for the character automatically; reload is required
- After changing the priority of characters, artifacts stay on the previous panel (save-data is safe however); reload is required

## Ideas under consideration
- [ ] option to remove all artifacts from all characters
- [ ] option to remove all artifacts from a single character
- [ ] Show artifacts-checkbox to the Options menu


## Credits
Artifact icons (src/js/dataset.json) are originally from [impact.moe](https://impact.moe/) using their API but later converted to .PNG and uploaded to imgur.com for faster loading times (original 256x256 .WebP images loaded quite slowly).
A few of them may also be from [Honey Impact](https://genshin.honeyhunterworld.com/) if impact.moe didn't have the images.
