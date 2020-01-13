import Input from '../js/livetest-model/input'

let inputestempty = new Input({ inpt: '', uniqsel: '#input-test', textcont: '' })
let inputest = new Input({ inpt: '', uniqsel: '#input-test', textcont: 'test' })

describe('input object', () => {
  test('Input toString() generates empty string', () => {
    expect(inputestempty.toString()).toBe('input "" to "#input-test"')
  })
  test('Input toString() generates correct string', () => {
    expect(inputest.toString()).toBe('input "" to "#input-test" with text "test"')
  })
})

describe('not expect', () => {
  test('Input toString() detect non empty string', () => {
    expect(inputestempty.toString()).toEqual(expect.not.stringContaining('input "wrong" to "#input-test"'))
  })
  test('Input toString() wrong empty string', () => {
    expect(inputestempty.toString()).toEqual(expect.not.stringContaining('input "" to "#input-test" with text "should not be here"'))
  })
  test('Input toString() detect wrong string', () => {
    expect(inputest.toString()).toEqual(expect.not.stringContaining('input "" to "#input-test" with text "wrong"'))
  })
  test('Input toString() detect wrong selector', () => {
    expect(inputest.toString()).toEqual(expect.not.stringContaining('input "" to "#wrong-sel" with text "wrong"'))
  })
})
