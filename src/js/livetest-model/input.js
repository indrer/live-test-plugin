export default class Input {
  constructor (sel, text) {
    this.sel = sel.uniqsel
    this.text = sel.textcont
    this.inpt = text
  }

  toString () {
    let resultString = `input "${this.inpt}" to "${this.sel}"`
    if (this.text.length > 0) {
      resultString = resultString + ` with text "${this.text}"`
    }
    return resultString
  }
}