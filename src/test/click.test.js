import Click from '../js/livetest-model/click'

let clicktest = new Click('#click-test', 'testing click')
let clicktestNoText = new Click('#click', '')
let clicktestNoSel = new Click('', '')

test('Click toString() generates correct string', () => {
  expect(clicktest.toString()).toBe('click "#click-test" with text "testing click"')
})

test('Click (no text) toString() generates correct string', () => {
  expect(clicktestNoText.toString()).toBe('click "#click"')
})

test('Click (no selector) toString() generates correct string', () => {
  expect(clicktestNoSel.toString()).toBe('click ""')
})