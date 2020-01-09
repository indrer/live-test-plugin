import Test from './livetest-model/test'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT } from './livetest-model/actionType'
import { saveText } from './util/fileDownloader'

let test = null
let message = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // Message from popup means we start a test
  message = msg
  if ((msg.from === 'popup') && (msg.subject === 'startRec')) {
    test = new Test(window.location.href)
  } else if ((msg.from === 'testwin') && (msg.subject !== 'testfin')) { // Listening for different test actions
    document.addEventListener('mousedown', listenForClicks)
  } else if ((msg.from === 'testwin') && (msg.subject === 'testfin')) { // Finished test
    saveText('test.wtest', test.toString())
    test = null
  }
  response()
})

// Listener for clicks
function listenForClicks (event) {
  event.target.addEventListener('click', clickEvent)
  let elinfo = selectorGenerator(event)
  if (message.subject === 'clickreq') {
    console.log('first click')
    test.addAction(CLICKACT, elinfo.uniqsel, elinfo.textcont)

    sendMessage('firstsel')

  } else if (message.subject === 'assertreq') {
    let assertType = message.assertType
    console.log('assert click')
    test.addAssertion(assertType, elinfo.uniqsel, elinfo.textcont)

    sendMessage('secondsel')

  }
  document.removeEventListener('mousedown', listenForClicks)
}

function clickEvent (event) {
  event.preventDefault()
  event.target.removeEventListener('click', clickEvent)
}

// send message from this tab
function sendMessage (subject) {
  console.log('msg sent from main')
  chrome.runtime.sendMessage({ from: 'main', subject: subject })
  /*  chrome.windows.getAll({ populate: true }, (wins) => {
      wins.forEach((win) => {
        win.tabs.forEach((tab) => {
          chrome.tabs.sendMessage(
            tab.id,
            { from: 'main', subject: subject })
        })
      })
    })
    
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { from: 'main', subject: subject })
      })
      */
}