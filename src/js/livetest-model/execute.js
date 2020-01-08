export default class Execute {
  constructor (text) {
    this.text = text === undefined ? '' : text
  }

  toString () {
    return `execute {{ ${this.text} }}`
  }
}
