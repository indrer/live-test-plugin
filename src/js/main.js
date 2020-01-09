import Test from './livetest-model/test'
import { selectorGenerator } from './util/selectorGenerator'
import { VISITACT, CLICKACT, EXECUTEACT } from './livetest-model/actionType'
import { saveText } from './util/fileDownloader'

let test = null
let message = null
// Message listener
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // Message from popup means we start a test
  message = msg
  if ((msg.from === 'popup') && (msg.subject === 'startRec')) {
    test = new Test(window.location.href)
  } else if ((msg.from === 'testwin') && (msg.subject === 'executereq')) {
    let executeString = message.executeString
    test.addAction(EXECUTEACT, '', executeString)
  } else if ((msg.from === 'testwin') && (msg.subject !== 'testfin')) { // Listening for different test actions
    document.addEventListener('mouseover', elMarkEvent)
    document.addEventListener('mouseout', elExitEvent)
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
  elExitEvent(event)
  document.removeEventListener('mousedown', listenForClicks)
  document.removeEventListener('mouseover', elMarkEvent)
  document.removeEventListener('mouseout', elExitEvent)
}

function clickEvent (event) {
  event.preventDefault()
  event.target.removeEventListener('click', clickEvent)
}

function elMarkEvent(event) {
  event.stopPropagation()
  event.target.style.outline = '2px solid red'
  if (event.target.tagName.toLowerCase() === 'img') {
    event.target.parentNode.appendChild(_createSelectorElement(event))
  } else {
    event.target.appendChild(_createSelectorElement(event))
  }
}

function elExitEvent(event) {
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

function _createSelectorElement(el) {
  // Target element values
  let elHeight = el.target.offsetHeight
  let elWidth = el.target.offsetWidth
  let fs = window.getComputedStyle(el.target, null).getPropertyValue('font-size');
  let fontSize = parseFloat(fs)

  let selector = selectorGenerator(el).uniqsel
  let p = document.createElement('p')
  p.style = `position: absolute;
  float: left;
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
function sendMessage (subject) {
  console.log('msg sent from main')
  chrome.runtime.sendMessage({ from: 'main', subject: subject })
}
