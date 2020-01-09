export default class Visit {
  constructor (sel, link) {
    this.sel = sel
    this.link = link
  }

  toString () {
    let resultString = `visit "${this.link}"`
    return resultString
  }
}
