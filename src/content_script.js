// this is in order to use imports and exports
// for more info, see https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
(async () => {
  const src = chrome.runtime.getURL('src/js/content.js');
  const contentScript = await import(src);
  contentScript.waitForPageToLoad(/* chrome: no need to pass it */);
})();
