// Listens for messages from any other scripts
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.subject === 'getTabId') {
    sendResponse({ tabId: sender.tab.id })
  }
})

// Send message on active tab change
chrome.tabs.onActivated.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { subject: 'activeTab', activeTab: tab.tabId })
  })
})
