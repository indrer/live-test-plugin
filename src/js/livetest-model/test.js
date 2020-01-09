import LinkedList from '../util/linkedList'
import Action from './action'
import Assertion from './assertion'
import Visit from './visit'

export default class Test {
  constructor (url) {
    this.url = url
    this.instructions = new LinkedList()
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
    let generateUrl = `visit "${this.url}" \n`
    return generateUrl + this.instructions.toString()
  }
}
