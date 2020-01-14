import Input from '../js/livetest-model/input'

let inputestempty = new Input({ uniqsel: '#input-test', textcont: '' }, '')
let inputest = new Input({ uniqsel: '#input-test', textcont: 'test' }, '')
let inputNonEmpty = new Input({ uniqsel: '#text-input-area', textcont: '' }, '"hello there!"')

describe('input object', () => {
  test('Input toString() generates empty string', () => {
    expect(inputestempty.toString()).toBe('input "" to "#input-test"')
  })
  test('Input toString() generates correct string', () => {
    expect(inputest.toString()).toBe('input "" to "#input-test" with text "test"')
  })
  // Due to how inconsistently Jest handles escape characters, multiple escapes are required.
  test('Input toString() generates correct string for non empty input', () => {
    expect(inputNonEmpty.toString()).toBe('input "\\"hello there!\\"" to "#text-input-area"')
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
