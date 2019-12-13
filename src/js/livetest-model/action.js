import { VISITACT, CLICKACT } from './actionType'
import Visit from './visit'
import Click from './click'

export default class Action {
  constructor (actionType, element, text) {
    this.action = null
    switch (actionType) {
      case VISITACT:
        this.action = new Visit(element, text)
        break
      case CLICKACT:
        this.action = new Click(element, text)
        break
      default:
        console.log('Something went wrong')
    }
  }

  getAction () {
    return this.action
  }
}
