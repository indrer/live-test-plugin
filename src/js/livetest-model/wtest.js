import LinkedList from '../util/linkedList'
import Action from './action'
import Assertion from './assertion'
import Visit from './visit'

export default class Test {
  constructor (url, notFirst) {
    this.instructions = new LinkedList()
    if (!notFirst) {
      this.instructions.addNode(new Visit(url))
    }
  }

  addAction (type, sel, text) {
    let action = new Action(type, sel, text)
    this.instructions.addNode(action)
  }

  addAssertion (type, sel, text) {
    let assertion = new Assertion(type, sel, text)
    this.instructions.addNode(assertion)
  }

  addVisit (sel, link) {
    let visit = new Visit(sel, link)
    this.instructions.addNode(visit)
  }

  toString () {
    return this.instructions.toString() + '\n'
  }
}
