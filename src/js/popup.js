// Button for start recording
document.addEventListener('DOMContentLoaded', () => {
  // On DOM load, add event listeners
  initEventList()
})

function initEventList () {
  // Test start button
  let startButton = document.getElementById('rec-button')
  startButton.addEventListener('click', startRecordingEvent)
}

function startRecordingEvent () {
  // Send message to content.js, referencing current tab
  // This asks content.js to set up event listeners for
  // element clicks
  // Testing purposes, delete later
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { from: 'popup', subject: 'startRec' })
  })

  // Start test window
  chrome.windows.create({
    url: chrome.runtime.getURL('../html/testwin.html'),
    type: 'popup',
    width: 453,
    height: 200
  })
}
