import Visit from '../js/livetest-model/visit'

let visittest = new Visit('', 'https://google.com')
let visittestNoLink = new Visit('', '')

test('Visit toString() generates correct string', () => {
  expect(visittest.toString()).toBe('visit "https://google.com"')
})

test('Visit (no link) toString() generates correct string', () => {
  expect(visittestNoLink.toString()).toBe('visit ""')
})
