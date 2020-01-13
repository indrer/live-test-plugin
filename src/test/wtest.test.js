import Visit from '../js/livetest-model/visit'
import Action from '../js/livetest-model/action'
import Assertion from '../js/livetest-model/assertion'
import Test from '../js/livetest-model/wtest'
import LinkedList from '../js/util/linkedList'
import { CLICKACT } from '../js/livetest-model/actionType'
import { SEE } from '../js/livetest-model/assertionType'

let wt = new Test('https://lnu.se')
wt.addAction(CLICKACT, '#test-bar', 'text')
wt.addAssertion(SEE, 'html div div', '')
describe('WTest object', () => {
  test('toString() methods of Action, Assertion and Visit called from WTest', () => {
    const act = Action.prototype.toString = jest.fn()
    const assrt = Assertion.prototype.toString = jest.fn()
    const visit = Visit.prototype.toString = jest.fn()
    wt.toString()
    expect(act).toHaveBeenCalled()
    expect(assrt).toHaveBeenCalled()
    expect(visit).toHaveBeenCalled()
  })

  test('toString() method of LinkedList called from WTest', () => {
    const linkedList = LinkedList.prototype.toString = jest.fn()
    wt.toString()
    expect(linkedList).toHaveBeenCalled()
  })

  test('toString() called in Test', () => {
    const tostr = Test.prototype.toString = jest.fn()
    wt.toString()
    expect(tostr).toHaveBeenCalled()
  })
})
