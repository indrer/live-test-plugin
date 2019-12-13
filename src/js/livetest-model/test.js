import LinkedList from '../util/linkedList'
import Action from './action'
import Assertion from './assertion'

export default class Test {
  constructor (url) {
    this.url = url
    this.instructions = new LinkedList()
  }

  addAction (type, element, text) {
    let action = new Action(type)
    this.instructions.addNode(action)
  }

  addAssertion (type, element) {
    let assertion = new Assertion(type, element)
    this.instructions.addNode(assertion)
  }
}
