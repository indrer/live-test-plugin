import Test from './livetest-model/wtest'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT, EXECUTEACT, INPUTACT } from './livetest-model/actionType'
import { saveText } from './util/fileDownloader'

let firstTestBool = window.sessionStorage.getItem('wtest') === null ? true : (window.sessionStorage.getItem('wtest').length === 0)
// Get tab ID of where the test is started
if (firstTestBool) {
  chrome.extension.sendMessage({ subject: 'getTabId' }, function (res) {
    window.localStorage.setItem('wtest-id', res.tabId)
  })
}
let test = new Test(window.location.href, firstTestBool)
let message = null
let inputString = null
let inputTargetEl = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // If no test started, change active tab
  if (window.localStorage.getItem('wtest-started') === null) {
    if (msg.subject === 'activeTab') {
      window.localStorage.setItem('wtest-id', msg.activeTab)
    }
  }
  chrome.runtime.sendMessage({ subject: 'getTabId' }, function (res) {
    if (res.tabId == window.localStorage.getItem('wtest-id')) { // Don't change to 3 =. Not same type!
      message = msg
      if ((msg.subject === 'windowClosing') && (msg.from === 'testwin')) { // Test window is getting closed, set to no active tests
        window.localStorage.removeItem('wtest-started')
        window.sessionStorage.removeItem('wtest')
      } else if ((msg.from === 'testwin') && (msg.subject !== 'testfin')) { // Listening for different test actions
        if ((msg.subject === 'executereq')) { // Execute action
          let executeString = message.executeString
          test.addAction(EXECUTEACT, '', executeString)
          sendMessage('executesel')
          window.sessionStorage.setItem('wtest', (window.sessionStorage.getItem('wtest') === null ? test.toString() : window.sessionStorage.getItem('wtest')) + test.getLastAdded())
          window.localStorage.setItem('wtest-started', true)
        } else if ((msg.subject === 'inputreq')) { // Input starting
          document.addEventListener('input', updateEvent)
        } else if ((msg.subject === 'inputfin')) { // Input ended
          document.removeEventListener('input', updateEvent)
          test.addAction(INPUTACT, inputTargetEl, inputString)
          inputString = null
          inputTargetEl = null
          window.sessionStorage.setItem('wtest', (window.sessionStorage.getItem('wtest') === null ? test.toString() : window.sessionStorage.getItem('wtest')) + test.getLastAdded())
        } else {
          document.addEventListener('mouseover', elMarkEvent)
          document.addEventListener('mouseout', elExitEvent)
          document.addEventListener('mousedown', listenForClicks)
        }
      } else if ((msg.from === 'testwin') && (msg.subject === 'testfin')) { // Finished test
        saveText('test.wtest', (window.sessionStorage.getItem('wtest') === null ? '' : window.sessionStorage.getItem('wtest')))
        window.sessionStorage.removeItem('wtest')
        window.localStorage.removeItem('wtest-started')
        test = new Test(window.location.href, true)
      }
      response()
    }
  })
})

// Listener for clicks
function listenForClicks (event) {
  event.stopPropagation()
  let elinfo = selectorGenerator(event.target)
  if (message.subject === 'clickreq') {
    test.addAction(CLICKACT, elinfo, '')
    sendMessage('clicksel')
    if (event.target.href) {
      window.location.href = event.target.href
    }
  } else {
    event.target.addEventListener('click', clickEvent)
    if (message.subject === 'assertreq') {
      let assertType = message.assertType
      test.addAssertion(assertType, elinfo, '')
      sendMessage('assertsel')
    } else if (message.subject === 'havereq') {
      let haveType = message.assertType
      test.addAssertion(haveType, elinfo, '')
      sendMessage('havesel')
    } else if (message.subject === 'visitreq') {
      if (!event.target.href) { // has no link, send message back to test window to alert user
        alert('The element does not contain any links!')
      } else {
        let href = event.target.href
        test.addAction(VISITACT, href)
      }
      sendMessage('visitsel')
    }
  }
  window.localStorage.setItem('wtest-started', true)
  if (window.sessionStorage.getItem('wtest') === null) {
    window.sessionStorage.setItem('wtest', test.toString())
  } else {
    window.sessionStorage.setItem('wtest', window.sessionStorage.getItem('wtest') + test.getLastAdded())
  }
  elExitEvent(event)
  document.removeEventListener('mousedown', listenForClicks)
  document.removeEventListener('mouseover', elMarkEvent)
  document.removeEventListener('mouseout', elExitEvent)
}

function updateEvent (event) {
  inputTargetEl = selectorGenerator(event.target)
  inputString = event.target.value
  sendMessage('inputstr', inputString)
}

function clickEvent (event) {
  event.preventDefault()
  event.target.removeEventListener('click', clickEvent)
}

function elMarkEvent (event) {
  event.stopPropagation()
  event.target.style.outline = '2px solid red'
  if (event.target.tagName.toLowerCase() === 'img') {
    event.target.parentNode.appendChild(createSelectorElement(event))
  } else {
    event.target.appendChild(createSelectorElement(event))
  }
}

function elExitEvent (event) {
  event.target.style.outline = ''
  let selChild = null
  if (event.target.tagName.toLowerCase() === 'img') {
    selChild = event.target.parentNode.querySelectorAll('.selector-text-wtest')[0]
    event.target.parentNode.removeChild(selChild)
  } else {
    selChild = event.target.querySelectorAll('.selector-text-wtest')[0]
    event.target.removeChild(selChild)
  }
}

function createSelectorElement (el) {
  // Target element values
  let elHeight = el.target.offsetHeight
  let fs = window.getComputedStyle(el.target, null).getPropertyValue('font-size')
  let fontSize = parseFloat(fs)

  let selector = selectorGenerator(el.target).uniqsel
  let p = document.createElement('p')
  p.style = `position: absolute;
  margin-top: -${elHeight + 5}px;
  background: red; 
  font-size: ${(fontSize * 0.8) > 14 ? 14 : (Math.floor(fontSize * 0.8))}px; 
  font-weight: normal; 
  color: white;
  padding: 0px;
  z-index: 9999;`
  p.classList.add('selector-text-wtest')
  p.textContent = selector
  return p
}

// send message from this tab
function sendMessage (subject, inputString) {
  chrome.runtime.sendMessage({ from: 'main', subject: subject, inputString: inputString })
}
