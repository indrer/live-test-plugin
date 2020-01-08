import { VISITACT, CLICKACT } from './actionType'
import Visit from './visit'
import Click from './click'
import Execute from './execute'

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
      case EXECUTEACT:
        this.action = new Execute(text)
        break
      default:
        console.log('Something went wrong')
    }
  }

  getAction () {
    return this.action
  }

  toString () {
    return this.action.toString()
  }
}
