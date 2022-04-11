A chrome extension for [Genshin Center's Ascension Planner](https://genshin-center.com/planner) that allows users to plan which artifacts to get for their Genshin Impact character. User can also set main and sub stats for the artifacts as well as mark them as acquired.

**The extension is now available on [Chrome Web Store](https://chrome.google.com/webstore/detail/artifacts-for-genshin-pla/jleonalkkhbfeafkmfgofopiadjkalno)!**

### NOTE: This is an unofficial extension developed by me (kripi), and NOT Genshin Center.
Questions can be asked preferably via Discord DMs (kripi#6436); the same goes for possible bug reports and feedback.

## Features
- Each character has 5 slots for artifacts.
- When clicked, the user can select the set (from a list) and set the main and sub stats to whatever they wish.
- When a slot with an artifact is hovered, a pop-up will show the stats along with the name of the set
- On the options menu, there are buttons for exporting and importing artifact save data. It can be copy & pasted to/from a text file or such
  - This is useful if the user uses multiple devices (laptop/PC) as cross-saving is (currently) not possible.

![Ningguang's Artifacts](https://i.imgur.com/aZwUY54.png "Ningguang's Artifacts")
![Edit window](https://i.imgur.com/f2Kxnq7.png)

## Todo
- Rewrite some of element functions using one string rather than multiple createElement functions
- Make it so clicking on the background of Edit Artifact window saves and closes the window; same as clicking ok

## Known issues
- Adding a new character does not create artifact slots for the character automatically; reload is required
- After changing the priority of characters, artifacts stay on the previous panel (save-data is safe however); reload is required

## Credits
Artifact icons (src/js/dataset.json) are originally from [impact.moe](https://impact.moe/) using their API but later converted to .PNG and uploaded to imgur.com for faster loading times (original 256x256 .WebP images loaded quite slowly).
A few of them may also be from [Honey Impact](https://genshin.honeyhunterworld.com/) or [Project Amber](https://ambr.top/en) if impact.moe didn't have the images at the time.
