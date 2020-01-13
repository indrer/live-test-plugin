export default class Input {
  constructor (text) {
    this.text = text === undefined ? '' : text
  }

  toString () {
    let resultString = `input "${this.text}"`
    return resultString
  }
}