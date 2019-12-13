# Live test plugin
Chrome extension

## Prerequisites

Node.js

## Running it

1. Fork or clone the repo.
2. Run `npm install` to install all the modules (please keep module folder ignored in `.gitignore`)
3. Run `npx webpack-cli` (this generates `content.js`).
2. Open Chrome, go to `chrome://extensions/`
3. Click **load unpacked** and choose the `src` folder of this repository (make sure `manifest.json` is in it!)
4. The extension should appear in your extension list. Make sure it's enabled!
