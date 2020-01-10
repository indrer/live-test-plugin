export default class Execute {
  constructor (text) {
    this.text = text === undefined ? '' : text
  }

  toString () {
    if (this.text.includes('\n')) {
      return `execute {{\n ${this.text}\n}}`
    } else {
      return `execute {{ ${this.text} }}`
    }
  }
}
