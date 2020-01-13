import Visit from '../js/livetest-model/visit'
import Click from '../js/livetest-model/click'
import Execute from '../js/livetest-model/execute'
import Action from '../js/livetest-model/action'
import Assertion from '../js/livetest-model/assertion'
import Test from '../js/livetest-model/wtest'
import LinkedList from '../js/util/linkedList'
import { VISITACT, CLICKACT, EXECUTEACT } from '../js/livetest-model/actionType'
import { SEE, HAVE } from '../js/livetest-model/assertionType'

// test correct generation when assertion, action and visit is added
// test correct generation if no action or assertion is added

let wtest = new Test('https://lnu.se')
wtest.addAction(CLICKACT, '#test-bar', 'text')
wtest.addAssertion(SEE, 'html div div', '')

describe('WTest object', () => {
  test('toString() methods of Action, Assertion and Visit called from WTest', () => {
    const act = Action.prototype.toString = jest.fn()
    const assrt = Assertion.prototype.toString = jest.fn()
    const visit = Visit.prototype.toString = jest.fn()
    let wt = new Test('https://lnu.se')
    wt.addAction(CLICKACT, '#test-bar', 'text')
    wt.addAssertion(SEE, 'html div div', '')
    wt.toString()
    expect(act).toHaveBeenCalled()
    expect(assrt).toHaveBeenCalled()
    expect(visit).toHaveBeenCalled()
  })

  test('toString() method of LinkedList called from WTest', () => {
    const linkedList = LinkedList.prototype.toString = jest.fn()
    let wt = new Test('https://lnu.se')
    wt.addAction(CLICKACT, '#test-bar', 'text')
    wt.addAssertion(SEE, 'html div div', '')
    wt.toString()
    expect(linkedList).toHaveBeenCalled()
  })

  test('String correctness from WTest', () => {
    let expectedString = 'visit "https://lnu.se"\nclick "#test-bar" with text "text"\nexpect to see "html div div"'
    console.log(wtest.toString())
    expect(wtest.toString()).toBe(expectedString)
  })
})
