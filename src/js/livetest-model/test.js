import LinkedList from '../util/linkedList'
import Action from './action'
import Assertion from './assertion'

export default class Test {
  constructor (url) {
    this.url = url
    this.instructions = new LinkedList()
  }

  addAction (type, sel, text) {
    let action = new Action(type, sel, text)
    this.instructions.addNode(action)
  }

  getAction () {
    return this.instructions.getCurrentNode()
  }

  addAssertion (type, sel, text) {
    let assertion = new Assertion(type, sel, text)
    this.instructions.addNode(assertion)
  }

  toString () {
    let generateUrl = `visit "${this.url}" \n`
    return generateUrl + this.instructions.toString()
  }
}
