// https://github.com/otiai10/chrome-extension-es6-import/blob/master/src/js/content_main.js
(async () => {
  const src = chrome.runtime.getURL('src/js/content.js');
  const contentScript = await import(src);
  contentScript.waitForPageToLoad(/* chrome: no need to pass it */);
})();
