/*var cheerio = require('cheerio')
var fs = require('fs')

test('Action of type visit generates correct string with toString()', () => {
  fs.readFile('./src/test/testsite.html', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    let $ = cheerio.load(data)
    expect($.html()).toBe('')
  })
})*/
import LinkedList from '../js/util/linkedList'

let linkedList = new LinkedList()
linkedList.addNode('bNode')

test('String Node has been added', () => {
  expect(linkedList.toString()).toBe('bNode')
})