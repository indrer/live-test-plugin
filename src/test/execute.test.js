import Execute from '../js/livetest-model/execute'

let executetest = new Execute('console.log("test")')
let executetestNoCode = new Execute('')
let executeTestNewLine = new Execute('console.log("Hi");\nalert("Hello")')

describe('Execute object', () => {
  test('Execute toString() generates correct string', () => {
    expect(executetest.toString()).toBe('execute {{ console.log(\\\"test\\\") }}')
  })

  test('Execute (no code) toString() generates correct string', () => {
    expect(executetestNoCode.toString()).toBe('execute {{  }}')
  })

  test('Execute (new line) toString() generates correct string', () => {
    expect(executeTestNewLine.toString()).toBe('execute {{\nconsole.log(\\\"Hi\\\");\nalert(\\\"Hello\\\")\n}}')
  })

  // expect to not contain
  test('Execute toString() detects wrong string', () => {
    expect(executetest.toString()).toEqual(expect.not.stringContaining('execute {{ console.log("wrong") }}'))
  })

  test('Execute (no code) detects existing string', () => {
    expect(executetestNoCode.toString()).toEqual(expect.not.stringContaining('execute {{ console.log("not empty") }}'))
  })

  test('Execute (new line) detects empty string', () => {
    expect(executeTestNewLine.toString()).toEqual(expect.not.stringContaining('execute {{  }}'))
  })
})
