import Test from './livetest-model/wtest'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT, EXECUTEACT, INPUTACT } from './livetest-model/actionType'
import { saveText } from './util/fileDownloader'

let test = new Test(window.location.href, window.localStorage.getItem('wtest') !== null)
let message = null
let inputString = null
let inputTargetEl = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // Message from popup means we start a test
  message = msg
  if ((msg.from === 'popup') && (msg.subject === 'startRec')) {
  } else if ((msg.from === 'testwin') && (msg.subject !== 'testfin')) { // Listening for different test actions
    if ((msg.subject === 'executereq')) { // Execute action
      let executeString = message.executeString
      test.addAction(EXECUTEACT, '', executeString)
      window.localStorage.setItem('wtest', (window.localStorage.getItem('wtest') === null ? '' : window.localStorage.getItem('wtest')) + test.toString())
      sendMessage('executesel')
    } else if ((msg.subject === 'inputreq')) { // Input starting
      document.addEventListener('input', updateEvent)
    } else if ((msg.subject === 'inputfin')) { // Input ended
      document.removeEventListener('input', updateEvent)
      test.addAction(INPUTACT, inputTargetEl, inputString)
      window.localStorage.setItem('wtest', (window.localStorage.getItem('wtest') === null ? '' : window.localStorage.getItem('wtest')) + test.toString())
      inputString = null
      inputTargetEl = null
    } else {
      document.addEventListener('mouseover', elMarkEvent)
      document.addEventListener('mouseout', elExitEvent)
      document.addEventListener('mousedown', listenForClicks)
    }
  } else if ((msg.from === 'testwin') && (msg.subject === 'testfin')) { // Finished test
    saveText('test.wtest', window.localStorage.getItem('wtest').substring(0, window.localStorage.getItem('wtest').length - 1))
    test = null
    window.localStorage.removeItem('wtest')
  }
  response()
})

// Listener for clicks
function listenForClicks (event) {
  event.target.addEventListener('click', clickEvent)
  event.stopPropagation()
  let elinfo = selectorGenerator(event.target)
  if (message.subject === 'clickreq') {
    test.addAction(CLICKACT, elinfo, '')
    sendMessage('clicksel')
  } else if (message.subject === 'assertreq') {
    let assertType = message.assertType
    test.addAssertion(assertType, elinfo, '')
    sendMessage('assertsel')
  } else if (message.subject == 'havereq') {
    let haveType = message.assertType
    test.addAssertion(haveType, elinfo, '')
    sendMessage('havesel')
  } else if (message.subject === 'visitreq') {
    if (!event.target.href) { // has no link, send message back to test window to alert user
      // TODO enable actions in test window again, do not add
      // this instruction to test window!
      alert('The element does not contain any links!')
    } else {
      let href = event.target.href
      // TODO possibly add textcont and unique selector separately to keep it consistent
      test.addAction(VISITACT, '', href)
    }
    sendMessage('visitsel')
  }
  window.localStorage.setItem('wtest', (window.localStorage.getItem('wtest') === null ? '' : window.localStorage.getItem('wtest')) + test.toString())
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
