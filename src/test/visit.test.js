const { Visit } = require('../js/livetest-model/visit')

let visittest = new Visit('', 'https://google.com')
test('Testing if this works', () => {
  expect(visittest.toString()).toBe('visit "https://google.com"')
})
