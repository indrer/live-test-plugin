// TODO
// Display added events
// Allow removing added events
let message = null
enableAll()

// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  message = msg
  if ((msg.from === 'main') && ((msg.subject === 'clicksel') || (msg.subject === 'assertsel')
    || (msg.subject === 'havesel') || (msg.subject === 'visitsel') || (msg.subject === 'executesel'))) {
    enableAll()
  }
  else if ((msg.from === 'main') && (msg.subject === 'inputstr')) {
    let inputString = message.inputString
    let inputBox = document.getElementById('input-text')
    inputBox.value = inputString
    document.getElementById('input-sub').disabled = false
  }
  response()
})

document.addEventListener('DOMContentLoaded', () => {
  // On DOM load, add event listeners
  initEventList()
})

function initEventList () {
  closingEvent()
  clickElementEvent()
  assertElement()
  assertHave()
  visitPage()
  clickSubmitEvent()
  clickInputStartEvent()
  inputSubmit()
  finishButton()
}

function closingEvent () {
  window.addEventListener('beforeunload', function (event) {
    sendMessage('windowClosing', '', '')
  })
}

function clickElementEvent () {
  let clickEl = document.getElementById('click-el-sel')
  clickEl.addEventListener('click', function (event) {
    // Inform main.js that the user will be selecting and
    // adding new click event
    sendMessage('clickreq', '', '')
    disableAll()
  })
}

function assertElement () {
  let assertEl = document.getElementById('assert-el-sel')
  assertEl.addEventListener('click', function (event) {
    // Let main.js know that the user will be adding
    // assertion
    let selection = document.getElementById('assert-op')
    let assertType = selection.options[selection.selectedIndex].value
    sendMessage('assertreq', assertType, '')
    disableAll()
  })
}

function clickSubmitEvent () {
  let executeSub = document.getElementById('execute-sub')
  executeSub.addEventListener('click', function (event) {
    let inputBox = document.getElementById('execute-text')
    let executeString = inputBox.value
    sendMessage('executereq', '', executeString)
    inputBox.value = ''
    disableAll()
  })
}

function visitPage () {
  let visitInputEl = document.getElementById('visit-el-sel')
  visitInputEl.addEventListener('click', function (event) {
    sendMessage('visitreq')
    disableAll()
  })
}

function assertHave () {
  let haveEl = document.getElementById('have-el-sel')
  haveEl.addEventListener('click', function (event) {
    let selection = document.getElementById('have-op')
    let haveType = selection.options[selection.selectedIndex].value
    sendMessage('havereq', haveType)
    disableAll()
  })
}
function clickInputStartEvent () {
  let clickEl = document.getElementById('input-el-sel')
  clickEl.addEventListener('click', function (event) {
    // Inform main.js that the user will be entering input in main
    sendMessage('inputreq', '', '')
    disableAll()
  })
}

function inputSubmit () {
  let clickEl = document.getElementById('input-sub')
  let inputTxt = document.getElementById('input-text')
  clickEl.addEventListener('click', function (event) {
    sendMessage('inputfin', '', '')
    inputTxt.value = ''
    enableAll()
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

function sendMessage (subject, assertType, executeString) {
  chrome.windows.getAll({ populate: true }, (wins) => {
    wins.forEach((win) => {
      win.tabs.forEach((tab) => {
        chrome.tabs.sendMessage(
          tab.id,
          { from: 'testwin', subject: subject, assertType: assertType, executeString: executeString },
          () => {
            if (subject === 'testfin') {
              window.close()
            }
          })
      })
    })
  })
}

// Helpers for disabling and enabling
function disableAll () {
  document.getElementById('click-el-sel').disabled = true
  document.getElementById('assert-el-sel').disabled = true
  document.getElementById('have-el-sel').disabled = true
  document.getElementById('execute-sub').disabled = true
  document.getElementById('visit-el-sel').disabled = true
  document.getElementById('finish-test-button').disabled = true
  document.getElementById('assert-op').disabled = true
  document.getElementById('have-op').disabled = true
  document.getElementById('execute-text').disabled = true
  document.getElementById('input-el-sel').disabled = true
  document.getElementById('input-sub').disabled = true
  document.getElementById('input-text').disabled = true
}

function enableAll () {
  document.getElementById('click-el-sel').disabled = false
  document.getElementById('assert-el-sel').disabled = false
  document.getElementById('have-el-sel').disabled = false
  document.getElementById('execute-sub').disabled = false
  document.getElementById('visit-el-sel').disabled = false
  document.getElementById('finish-test-button').disabled = false
  document.getElementById('assert-op').disabled = false
  document.getElementById('have-op').disabled = false
  document.getElementById('execute-text').disabled = false
  document.getElementById('input-el-sel').disabled = false
  document.getElementById('input-sub').disabled = false
  document.getElementById('input-text').disabled = true
}
