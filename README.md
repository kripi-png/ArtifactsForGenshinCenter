<!--
# V2 Rewrite

Some sort of a TODO:
- [x] migrate from npm to pnpm
- [x] migrate from rollup to vite
- [x] ~~HMR~~
- [x] rewrite and create components with ts and vue/svelte
- [x] try redesigning the artifact dataset structure
- [x] "host" the dataset on github instead of bundling with the extension
- [x] improve content script's mounting
- [x] listen for new character panels ~~as well as detect when they are removed~~
- [x] consider wxt/storage's versioning for dataset fetching
- [ ] tests for Svelte components?
- [ ] go through the answers to the Feedback form and check for any suggestions for new features
- [ ] rewrite the README
- [ ] ensure Firefox compatibility?
  - this was not nearly as easy and straightforward as I thought it would be, or frankly, should be
- [ ] publish on Firefox and find testers -> collect feedback
  - especially important is robust migration of data from V1 to V2
  - [x] for this, utilize WXT storage API and its migration feature
- [ ] publish on Chrome Web Store
- [ ] use a library to validate the editor data; especially the set's name
  - [ArkType](https://arktype.io/) seems pretty fast
- [ ] localization
  - perhaps store a ID for sets in the dataset, and have localizations bundled with the extension
- [ ] notification system
-->

[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/jleonalkkhbfeafkmfgofopiadjkalno?style=for-the-badge&logo=googlechrome&label=Chrome%20Users&color=orange)](https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno)

# Artifacts for Genshin Center
**NOTE: This is an unofficial extension developed by [@kripi-png](https://github.com/kripi-png), and NOT Genshin Center.**

A chrome extension for [Genshin Center's Ascension Planner](https://genshin-center.com/planner).
It helps users with planning which artifacts they want to get for their Genshin Impact character.
It is also possible to set the main and sub stats for the artifacts and mark them as obtained in-game.

**The extension is available on [Chrome Web Store](https://chrome.google.com/webstore/detail/artifacts-for-genshin-pla/jleonalkkhbfeafkmfgofopiadjkalno)!**

## Features
- Each character has 5 slots for artifacts.
- When clicked, the user can select the set (from a list) and write down the main and sub stats.
- When a slot with an artifact is hovered, a pop-up will show the stats along with the name of the set
- In the options menu, there are buttons for exporting and importing artifact save data.
  - Syncing between user's devices is currently not possible, but this allows for sharing the data between devices (or users)

### Examples
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
A few of them may also be from [Honey Impact](https://genshin.honeyhunterworld.com/) or [Project Amber](https://gi.yatta.moe/en) if impact.moe didn't have the images at the time.

## Development and contributing
- Feel free to create pull requests, issues, and whatnot. I'll review and merge them when I have time
- Please ensure commits are (more or less) in accordance with Conventional Commits v1.0.0 guidelines: https://www.conventionalcommits.org/en/v1.0.0/

### Development
- **The project uses [pnpm](https://pnpm.io/) instead of npm. Make sure to install it.**
- After cloning the repo, run `pnpm install` to install all packages.
- Run `pnpm dev` to start the vite development server. This command watches for changes in the source code and automatically rebuilds the dist/ folder as needed.
- Navigate to chrome://extensions/ and enable Developer Mode from top-right corner.
- Click Load Unpacked button on top-left, and select the **dist/** folder inside the project folder.
- Extension should now be operational, so navigate to https://genshin-center.com/planner.
- Thanks to Vite and crxjs' Hot Module Replacement (HMR), the extension will automatically reload when you make changes to the code.
