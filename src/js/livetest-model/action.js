import { VISITACT, CLICKACT } from './actionType'
import Visit from './visit'
import Click from './click'

export default class Action {
  constructor (actionType, sel, text) {
    this.action = null
    switch (actionType) {
      case VISITACT:
        this.action = new Visit(sel, text)
        break
      case CLICKACT:
        this.action = new Click(sel, text)
        break
      default:
        console.log('Something went wrong')
    }
  }

  getAction () {
    return this.action
  }

  toString () {
    //  console.log('action class string: ' + this.action.toString())
    return this.action.toString()
  }
}
