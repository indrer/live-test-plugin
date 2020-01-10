import { escapeString } from '../util/stringEscape'

export default class Execute {
  constructor (text) {
    this.text = text === undefined ? '' : escapeString(text)
  }

  toString () {
    return `execute {{ ${this.text} }}`
  }
}
