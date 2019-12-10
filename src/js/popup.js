// Button for start recording
// Hide elements, display test fields, send message
// to content.js about a click (to enable mousedown event listener)
document.addEventListener('DOMContentLoaded', () => {
  console.log('hello')
  // On DOM load, add event listeners
  initEventList()
})

function initEventList () {
  // Test start button
  let startButton = document.getElementById('rec-button')
  startButton.addEventListener('click', greetingsButtonEvent)
}

function greetingsButtonEvent () {
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
      { from: 'popup', subject: 'greetings' },
      function (response) {
        // TODO think what to do here
        console.log(response)
      })
  })
  chrome.windows.create({
    url: chrome.runtime.getURL('../html/testwin.html'),
    type: 'popup',
    width: 300,
    height: 200
  })
}
