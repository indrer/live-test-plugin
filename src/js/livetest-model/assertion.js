import { SEE, NOTSEE } from './assertionType'

export default class Assertion {
  constructor(type, element) {
    this.type = type
    this.element = element
  }
}
