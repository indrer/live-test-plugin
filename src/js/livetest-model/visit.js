export default class Visit {
  constructor (sel, link) {
    this.sel = sel
    this.link = link
  }

  toString () {
    let resultString = `expect to visit "${this.link}"`
    return resultString
  }
}