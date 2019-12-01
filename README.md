# Live test plugin
Chrome extension

## Running it

1. Fork or clone the repo.
2. Open Chrome, go to `chrome://extensions/`
3. Click **load unpacked** and choose the `src` folder of this repository (make sure `manifest.json` is in it!)
4. The extension should appear in your extension list. Make sure it's enabled!

Go to some page, open inspector and look at the console. Click on some element and it should output its selector. To check if it's the correct selector, you can call `document.querySelectorAll('GENERATED SELECTOR')` and check if it returns only one element.