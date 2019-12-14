// TODO
// Add visit
// Display added events
// Allow removing added events

document.addEventListener('DOMContentLoaded', () => {
  // On DOM load, add event listeners
  initEventList()
})

function initEventList () {
  clickElementEvent()
  assertElement()
  finishButton()
}

function clickElementEvent () {
  let clickEl = document.getElementById('click-el-sel')
  clickEl.addEventListener('click', function (event) {
    // Inform main.js that the user will be selecting and
    // adding new click event
    sendMessage('clickreq')
  })
}

function assertElement () {
  let assertEl = document.getElementById('assert-add')
  assertEl.addEventListener('click', function (event) {
    // Let main.js know that the user will be adding
    // assertion
    let selection = document.getElementById('assert-op')
    let assertType = selection.options[selection.selectedIndex].value
    sendMessage('assertreq', assertType)
  })
}

function finishButton () {
  let finishButton = document.getElementById('finish-test-button')
  finishButton.addEventListener('click', function (event) {
    // Let main.js know that the test is finished
    // and it can start generating the script
    sendMessage('testfin')
    window.close()
  })
}

function sendMessage (subject, assertType) {
  chrome.windows.getAll({ populate: true }, (windows) => {
    windows.forEach((window) => {
      window.tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id,
          { from: 'testwin', subject: subject, assertType: assertType })
      })
    })
  })
}
