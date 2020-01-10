import { escapeString } from '../../js/util/stringEscape'

let noEscapeChar = 'Simple string'
let onlyEscpChar = '"'
let withEscpChar = '"Hey there!", he said. "This is a useless string\\"'
let emptyString = ''

test('A string with no characters to escape doesn\'t get changed', () => {
  expect(escapeString(noEscapeChar)).toMatch('Simple string')
})

console.log(escapeString(onlyEscpChar))

test('A string with only and escape character doesn\'t get changed', () => {
  expect(escapeString(onlyEscpChar)).toMatch('\\\"')
})

test('A string with escape characters and regular characters doesn\'t get changed', () => {
  expect(escapeString(withEscpChar)).toEqual('\\\"Hey there!\\\", he said. \\\"This is a useless string\\\\\\\"')
})

test('Empty string doesn\'t get changed', () => {
  expect(escapeString(emptyString)).toEqual('')
})
