export default class Click {
  constructor (sel, text) {
    this.sel = sel
    this.text = text === undefined ? '' : text
  }

  toString () {
    let action = `click "${this.sel}"`
    if (this.text.length === 0) {
      return action
    } else {
      let text = ` with text "${this.text}"`
      return action + text
    }
  }
}
