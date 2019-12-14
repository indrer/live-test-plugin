import Test from './livetest-model/test'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT } from './livetest-model/actionType'

let test = null
// Message listener
chrome.runtime.onMessage.addListener((msg) => {
  // Message from popup means we start a test
  if ((msg.from === 'popup') && (msg.subject === 'startRec')) {
    test = new Test(window.location.href)
  } else if (msg.from === 'testwin' && (msg.subject !== 'testfin')) { // Listening for different test actions
    listenForClicks(msg)
  } else if (msg.from === 'testwin' && msg.subject === 'testfin') { // Finished test
    test.toString()
  }
})

// Listener for clicks
function listenForClicks (msg) {
  document.addEventListener('mousedown', function (event) {
    event.stopPropagation()
    let elinfo = selectorGenerator(event.target)
    if (msg.subject === 'clickreq') {
      test.addAction(CLICKACT, elinfo.uniqsel, elinfo.textcont)
    } else if (msg.subject === 'assertreq') {
      let assertType = msg.assertType
      test.addAssertion(assertType, elinfo.uniqsel, elinfo.textcont)
    }
  })
}

// Receive message from popup - start recording
// Receive message from test window - generated intstructions
// Generate test (url)
