import Visit from '../js/livetest-model/visit'

let visittest = new Visit('', 'https://google.com')
let visittestNoLink = new Visit('', '')

test('Visit toString() generates correct string', () => {
  expect(visittest.toString()).toBe('visit "https://google.com"')
})

test('Visit (no link) toString() generates correct string', () => {
  expect(visittestNoLink.toString()).toBe('visit ""')
})

// expect to not contain
test('Visit toString() etect wrong link', () => {
  expect(visittest.toString()).toEqual(expect.not.stringContaining('visit "https://lipsum.com"'))
})

test('Visit (no link) toString() detect link is not empty', () => {
  expect(visittestNoLink.toString()).toEqual(expect.not.stringContaining('visit "https://google.com"'))
})
