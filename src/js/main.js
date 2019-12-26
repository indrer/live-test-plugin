import Test from './livetest-model/test'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT } from './livetest-model/actionType'
import { saveText } from './util/fileDownloader'

let test = null
let message = null
let error = ''
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
    test.addAction(CLICKACT, elinfo.uniqsel, elinfo.textcont)
  } else if (message.subject === 'assertreq') {
    let assertType = message.assertType
    test.addAssertion(assertType, elinfo.uniqsel, elinfo.textcont)
  } else if (message.subject === 'visitreq') {
    if (!event.target.href) { // has no link, send message back to test window to alert user
      // TODO enable actions in test window again, do not add
      // this instruction to test window!
      alert('The element does not contain any links!')
    } else {
      let href = event.target.href
      // TODO possibly add textcont and unique selector separately to keep it consistent
      test.addVisit(elinfo, href)
    }
  }
  document.removeEventListener('mousedown', listenForClicks)
}

function clickEvent (event) {
  event.preventDefault()
  event.target.removeEventListener('click', clickEvent)
}
