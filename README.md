# V2 Rewrite

Now, there are not *real* reasons to do a full rewrite of the extension.
Everything works and adding new artifacts is reasonably easy - that is all that is required.

However, the project is now a few years old, and I'd like to get back to it for some time.
I'd like to do and try new things with extensions in general, and also fix some bad taste inducing things in the addon.

Some problems and minor inconveniences:
- adding artifacts could be easier
- the artifact dataset is kind of massive
- circular dependencies
  - src/js/artifactRenderer.js -> src/js/components/ArtifactEditor.js -> src/js/artifactRenderer.js
- code is partly messy and some files are long
- javascript vs typescript
- vanilla js vs svelte/vue/react
- rollup vs vite
- npm vs pnpm
- no hot module replacement

These add up to sizeable amount of work, and, if completed, should provide a solid framework for future extensions I may or may not develop.

Some sort of TODO:
- [x] migrate from npm to pnpm
- [x] migrate from rollup to vite
- [x] HMR
- [ ] rewrite and create components with ts and vue/svelte
- [ ] try redesigning the artifact dataset structure
- [ ] "host" the dataset on github instead of bundling with the extension
  - this is especially convenient as updating the json on gh is enough to add artifacts
  - however fetching the entire thing on every reload cannot be a good idea, so need to cache it somehow

A chrome extension for [Genshin Center's Ascension Planner](https://genshin-center.com/planner). Helps users to plan which artifacts they want to get for their Genshin Impact character. Users can also set main and sub stats for the artifacts and mark them as obtained in-game.
<br>
**NOTE: This is an unofficial extension developed by me (kripi), and NOT Genshin Center.**

**The extension is available on [Chrome Web Store](https://chrome.google.com/webstore/detail/artifacts-for-genshin-pla/jleonalkkhbfeafkmfgofopiadjkalno)!**
<br>
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/jleonalkkhbfeafkmfgofopiadjkalno?style=for-the-badge&logo=googlechrome&label=Chrome%20Users&color=orange)](https://chrome.google.com/webstore/detail/artifacts-for-genshin-cen/jleonalkkhbfeafkmfgofopiadjkalno)


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
