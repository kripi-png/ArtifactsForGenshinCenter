
A chrome extension for [Genshin Center's Ascension Planner](https://genshin-center.com/planner). Helps users to plan which artifacts they want to get for their Genshin Impact character. Users can also set main and sub stats for the artifacts and mark them as obtained in-game.
<br>
**NOTE: This is an unofficial extension developed by me (kripi), and NOT Genshin Center.**

**The extension is available on [Chrome Web Store](https://chrome.google.com/webstore/detail/artifacts-for-genshin-pla/jleonalkkhbfeafkmfgofopiadjkalno)!**
<br>
[![Chrome Users](https://img.shields.io/endpoint?url=https://untitled-o1ez295tqzik.runkit.sh/)](https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno)

## Features
- Each character has 5 slots for artifacts.
- When clicked, the user can select the set (from a list) and set the main and sub stats to whatever they wish.
- When a slot with an artifact is hovered, a pop-up will show the stats along with the name of the set
- On the options menu, there are buttons for exporting and importing artifact save data. It can be copy & pasted to/from a text file or such
  - This is useful if the user uses multiple devices (laptop/PC) as cross-saving is (currently) not possible.

![Ningguang's Artifacts](https://i.imgur.com/aZwUY54.png "Ningguang's Artifacts")
![Edit window](https://i.imgur.com/f2Kxnq7.png)

## Todo
- Look into localization
- Look into Firefox extensions
  - also some other browsers
- Maybe notify the user about new artifact sets and such using the website's update notification system

## Known issues
- Visiting another page on Genshin Center (e.g. the Weapons page) removes the slots
  - can be fixed by reloading the page

## Found a bug? Got a question or feedback?
You can either send me a message on Discord (kripi#6436), or in case of bug reports you can also open a new issue here on GitHub.

## Credits
Artifact icons (src/js/dataset.json) are originally from [impact.moe](https://impact.moe/) using their API but later converted to .PNG and uploaded to imgur.com.
A few of them may also be from [Honey Impact](https://genshin.honeyhunterworld.com/) or [Project Amber](https://ambr.top/en) if impact.moe didn't have the images at the time.

## Development and contributing
- Feel free to create pull requests, issues, and whatnot. I'll review and merge them when I have time
- Please ensure commits are (more or less) in accordance with Conventional Commits v1.0.0 guidelines: https://www.conventionalcommits.org/en/v1.0.0/

### Development
- After cloning the repo locally, run `npm install` to install all packages
- After installing, run `npm start`. This command watches for changes in the source code and automatically rebuilds the dist/ folder as needed.
  - Alternatively run `npm run build` to simply generate dist/ folder and a .zip file
- Navigate to chrome://extensions/ and enable Developer Mode from top-right corner
- Click Load Unpacked button on top-left, and select the **dist/** folder
- Extension should now be operational, so navigate to https://genshin-center.com/planner
- Because rollup is watching for changes, you can simply make a change to the source code and refresh genshin center, and the changes should be visible
