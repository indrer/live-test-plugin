// TODO
// Add visit
// Display added events
// Allow removing added events

let message = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  message = msg
  if (msg.from === 'main') {
    document.addEventListener('mousedown', listenForClicks)
    console.log('msg received from main')
  }
  response()
})

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
  /*  document.getElementById('click-el-sel').disabled = false
    document.getElementById('assert-el-sel').disabled = true
    document.getElementById('finish-test-button').disabled = true
  */
  let clickEl = document.getElementById('click-el-sel')
  clickEl.addEventListener('click', function (event) {
    // Inform main.js that the user will be selecting and
    // adding new click event
    sendMessage('clickreq')
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
  console.log('testwin clicking')
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

function listenForClicks (event) {
  event.target.addEventListener('click', clickEvent)
  if (message.subject === 'firstsel') {
    console.log('cliiiiiick')

    document.getElementById('click-el-sel').disabled = true

  }
  document.removeEventListener('mousedown', listenForClicks)
}

function clickEvent (event) {
  event.preventDefault()
  event.target.removeEventListener('click', clickEvent)
}