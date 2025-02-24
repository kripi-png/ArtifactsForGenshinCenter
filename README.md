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
- [x] rewrite the README
- [ ] ensure Firefox compatibility?
  - this was not nearly as easy and straightforward as I thought it would be, or frankly, should be
- [ ] publish on Firefox and find testers -> collect feedback
  - especially important is robust migration of data from V1 to V2
  - [x] for this, utilize WXT storage API and its migration feature
- [ ] publish on Chrome Web Store
- [ ] use a library to validate the editor data; especially the set's name
  - [ArkType](https://arktype.io/) seems pretty fast
- [ ] internationalization / i18n
  - perhaps store a ID for sets in the dataset, and have localizations bundled with the extension
- [ ] notification system for updates

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
![Yumemizuki Artifacts](https://i.imgur.com/04fzgtD.png)
![Edit window](https://i.imgur.com/xIz2QoV.png)

## Possible new features
- Localization
- Porting to Firefox
- Notifications on new artifact sets and extension updates

## Bugs, questions, feedback
- You can contact me on Discord (kripi#6436, can be found on Genshin Center server)
- In case of bug reports, you can also open a new issue here on GitHub.
- There is also the Support Center on Web Store

## Development and contributing
- Feel free to create pull requests, issues, and whatnot. I'll review and merge them when I have time
- When writing commit messages, please try to follow the [Conventional Commits v1.0.0 guidelines](https://www.conventionalcommits.org/en/v1.0.0/).
  - This helps with consistency and clarity in the messages

### Development
**Note**: the project uses [pnpm](https://pnpm.io/) instead of npm.

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run `pnpm dev` to start the project and generate the dist\ directory
4. Navigate to chrome://extensions/ and enable Developer Mode from top-right corner.
5. Click Load Unpacked button on top-left, and select the dist\chrome-mv3\ directory
6. Navigate to https://genshin-center.com/planner. Everything should now work.

When the source code is changed, WXT automatically rebuilds the dist\ directory and reloads the extension.
