import Click from '../js/livetest-model/click'

let clicktest = new Click({ uniqsel: '#click-test', textcont: 'testing click' })
let clicktestNoText = new Click({ uniqsel: '#click', textcont: '' })
let clicktestNoSel = new Click({ uniqsel: '', textcont: '' })

describe('Click object', () => {
  test('Click toString() generates correct string', () => {
    expect(clicktest.toString()).toBe('click "#click-test" with text "testing click"')
  })

  test('Click (no text) toString() generates correct string', () => {
    expect(clicktestNoText.toString()).toBe('click "#click"')
  })

  test('Click (no selector) toString() generates correct string', () => {
    expect(clicktestNoSel.toString()).toBe('click ""')
  })

  // expect to not contain
  test('Click toString() detect wrong string', () => {
    expect(clicktest.toString()).toEqual(expect.not.stringContaining('click "#wrong-test" with text "wrong click"'))
  })

  test('Click (no text) toString() detect no string', () => {
    expect(clicktestNoText.toString()).toEqual(expect.not.stringContaining('click ""'))
  })

  test('Click (no selector) toString() detect wrong string', () => {
    expect(clicktestNoSel.toString()).toEqual(expect.not.stringContaining('click "#click"'))
  })
})
