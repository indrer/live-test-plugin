export default class Assertion {
  constructor (type, sel, text) {
    this.type = type
    this.sel = sel.uniqsel
    this.text = sel.textcont
  }

  toString () {
    let action = `expect to ${this.type.replace('-', ' ')} "${this.sel}"`
    if (this.text.length === 0) {
      return action
    } else {
      let text = ` with text "${this.text}"`
      return action + text
    }
  }
}
