import { SEE, NOTSEE } from './assertionType'

export default class Assertion {
  constructor (type, sel, text) {
    this.type = type
    this.sel = sel
    this.text = text
  }
}
