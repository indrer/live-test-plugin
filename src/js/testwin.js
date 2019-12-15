// TODO
// Add visit
// Display added events
// Allow removing added events

let message = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // Message from popup means we start a test
  console.log('test? ' + window.location.href)
  message = msg
  if (msg.from === new Test(window.location.href))
    console.log('test! ' + window.location.href)
  response()
})

document.addEventListener('DOMContentLoaded', () => {
  // On DOM load, add event listeners
  initEventList()
})

function initEventList () {
  // visitUrl()
  clickElementEvent()
  assertElement()
  finishButton()
}

/*
function visitUrl () {
  document.getElementById('visit-current').innerHTML = window.location.href
}*/

function clickElementEvent () {
  document.getElementById('click-el-sel').disabled = false
  document.getElementById('assert-el-sel').disabled = true
  document.getElementById('finish-test-button').disabled = true
  let clickEl = document.getElementById('click-el-sel')
  clickEl.addEventListener('click', function (event) {
    // Inform main.js that the user will be selecting and
    // adding new click event
    sendMessage('clickreq')
    if (msg.from === 'clickedEl') {
      console.log('HMM')
      document.getElementById('click-el-sel').disabled = true
      document.getElementById('assert-el-sel').disabled = false
    }
  })
}

function assertElement () {
  let assertEl = document.getElementById('assert-el-sel')
  assertEl.addEventListener('click', function (event) {
    // Let main.js know that the user will be adding
    // assertion
    let selection = document.getElementById('assert-op')
    let assertType = selection.options[selection.selectedIndex].value
    sendMessage('assertreq', assertType)
    document.getElementById('assert-el-sel').disabled = true
    document.getElementById('finish-test-button').disabled = false
  })
}

function finishButton () {
  let finishButton = document.getElementById('finish-test-button')
  finishButton.addEventListener('click', function (event) {
    event.preventDefault()
    // Let main.js know that the test is finished
    // and it can start generating the script
    sendMessage('testfin')
  })
}

function sendMessage (subject, assertType) {
  chrome.windows.getAll({ populate: true }, (wins) => {
    wins.forEach((win) => {
      win.tabs.forEach((tab) => {
        chrome.tabs.sendMessage(
          tab.id,
          { from: 'testwin', subject: subject, assertType: assertType },
          () => {
            if (subject === 'testfin') {
              window.close()
            }
          })
      })
    })
  })
}
