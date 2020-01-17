chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getTabId') {
    sendResponse({ tabId: sender.tab.id })
  }
})
