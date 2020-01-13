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
      let selector = selectorGenerator(dom.window.document.querySelector('#list-container > ul > a:nth-child(2) > li'))
      expect(selector.textcont).toBe('Something2')
      expect(selector.uniqsel).toBe('#list-container li')
    })
  })

  test('Generating selector to an element with no id, with a lot of parents', () => {
    fs.readFile('./src/test/mocks/testsite.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      let dom = new JSDOM(data)
      let selector = selectorGenerator(dom.window.document.querySelector('body > div > div.lipsum-container > div.lets > div > div.thisone > div > a'))
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
      let selector = selectorGenerator(dom.window.document.querySelector('body > div > div.selenium-container > div:nth-child(1)'))
      expect(selector.textcont).toBe('Same-Class-Test')
      expect(selector.uniqsel).toBe('html body div div div')
    })
  })
})
