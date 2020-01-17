import { selectorGenerator } from '../js/util/selectorGenerator'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
var fs = require('fs')

describe('selectonGenerator function', () => {
  test('Generating selector for element with parent that has an ID', () => {
    fs.readFile('./src/test/mocks/testsite.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      let dom = new JSDOM(data)
      let selector = selectorGenerator(dom.window.document.querySelector('[name="list-test"]'))
      expect(selector.textcont).toBe('Something2')
      expect(selector.uniqsel).toBe('#list-container li')
    })
  })

  test('Generating selector for element with same tag siblings, no ID', () => {
    fs.readFile('./src/test/mocks/testsite.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      let dom = new JSDOM(data)
      let selector = selectorGenerator(dom.window.document.querySelector('[name="same-element-test"]'))
      expect(selector.textcont).toBe('Visit Lnu3')
      expect(selector.uniqsel).toBe('html body div div a')
    })
  })

  test('Generating selector to an element with no id, with a lot of parents', () => {
    fs.readFile('./src/test/mocks/testsite.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      let dom = new JSDOM(data)
      let selector = selectorGenerator(dom.window.document.querySelector('[name="burried-test"]'))
      expect(selector.textcont).toBe('Visit Lipsum')
      expect(selector.uniqsel).toBe('html body div div div div div div a')
    })
  })

  test('Generating selector for element with several siblings with same class and type', () => {
    fs.readFile('./src/test/mocks/testsite.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      let dom = new JSDOM(data)
      let selector = selectorGenerator(dom.window.document.querySelector('[name="same-class-test"]'))
      expect(selector.textcont).toBe('Same-Class-Test')
      expect(selector.uniqsel).toBe('html body div div div')
    })
  })
})
