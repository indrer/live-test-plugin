import { VISITACT, CLICKACT, EXECUTEACT, INPUTACT } from './actionType'
import Visit from './visit'
import Click from './click'
import Execute from './execute'
import Input from './input'

export default class Action {
  constructor (actionType, sel, text) {
    this.action = null
    switch (actionType) {
      case VISITACT:
        this.action = new Visit(text)
        break
      case CLICKACT:
        this.action = new Click(sel)
        break
      case EXECUTEACT:
        this.action = new Execute(text)
        break
      case INPUTACT:
        this.action = new Input(sel, text)
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
