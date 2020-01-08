export default class Execute {
  constructor (text) {
    this.text = text === undefined ? '' : text
  }

  toString () {
    let action = `execute "${this.text}"`
    if (this.text.length === 0) {
      return action
    }
  }
}