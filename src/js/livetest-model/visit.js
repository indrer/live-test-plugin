export default class Visit {
  constructor (link) {
    this.link = link
  }

  toString () {
    let resultString = `visit "${this.link}"`
    return resultString
  }
}
