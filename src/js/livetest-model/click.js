export default class Click {
  constructor (sel) {
    this.sel = sel.uniqsel
    this.text = sel.textcont
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
