import Execute from '../js/livetest-model/execute'

let executetest = new Execute('console.log("test")')
let executetestNoCode = new Execute('')
let executeTestNewLine = new Execute('console.log("Hi");\nalert("Hello")')

test('Execute toString() generates correct string', () => {
  expect(executetest.toString()).toBe('execute {{ console.log("test") }}')
})

test('Execute (no code) toString() generates correct string', () => {
  expect(executetestNoCode.toString()).toBe('execute {{  }}')
})

test('Execute (new line) toString() generates correct string', () => {
  expect(executeTestNewLine.toString()).toBe('execute {{ console.log("Hi");\nalert("Hello") }}')
})