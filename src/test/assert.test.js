import Assertion from '../js/livetest-model/assertion'
import { SEE, NOTSEE, HAVE, NOTHAVE } from '../js/livetest-model/assertionType'

let seetest = new Assertion(SEE, '#test-see')
let seetestWithText = new Assertion(SEE, '#test-see', 'visible')
let seetestWithoutSel = new Assertion(SEE, '', '')

let notseetest = new Assertion(NOTSEE, '#test-notsee')
let noteseetestWithText = new Assertion(NOTSEE, '#test-notsee', 'visible')
let noteseetestWithoutSel = new Assertion(NOTSEE, '', '')

let havetest = new Assertion(HAVE, '#test-have')
let havetestWithText = new Assertion(HAVE, '#test-have', 'visible')
let havetestWithoutSel = new Assertion(HAVE, '', '')

let nothavetest = new Assertion(NOTHAVE, '#test-nothave')
let nothavetestWithText = new Assertion(NOTHAVE, '#test-nothave', 'visible')
let nothavetestWithoutSel = new Assertion(NOTHAVE, '', '')

// ========= See tests =========
test('Assertion "expect to see" toString() generates correct string', () => {
  expect(seetest.toString()).toBe('expect to see "#test-see"')
})

test('Assertion "expect to see" with text toString() generates correct string', () => {
  expect(seetestWithText.toString()).toBe('expect to see "#test-see" with text "visible"')
})

test('Assertion "expect to see" without selector toString() generates correct string', () => {
  expect(seetestWithoutSel.toString()).toBe('expect to see ""')
})

// ========= Not see tests =========
test('Assertion "expect to not see" toString() generates correct string', () => {
  expect(notseetest.toString()).toBe('expect to not see "#test-notsee"')
})

test('Assertion "expect to not see" with text toString() generates correct string', () => {
  expect(noteseetestWithText.toString()).toBe('expect to not see "#test-notsee" with text "visible"')
})

test('Assertion "expect to not see" toString() generates correct string', () => {
  expect(noteseetestWithoutSel.toString()).toBe('expect to not see ""')
})

// ========= Have tests =========
test('Assertion "expect to have" toString() generates correct string', () => {
  expect(havetest.toString()).toBe('expect to have "#test-have"')
})

test('Assertion "expect to have" with text toString() generates correct string', () => {
  expect(havetestWithText.toString()).toBe('expect to have "#test-have" with text "visible"')
})

test('Assertion "expect to have" without selector toString() generates correct string', () => {
  expect(havetestWithoutSel.toString()).toBe('expect to have ""')
})

// ========= Not have tests =========
test('Assertion "expect to not have" toString() generates correct string', () => {
  expect(nothavetest.toString()).toBe('expect to not have "#test-nothave"')
})

test('Assertion "expect to not have" toString() generates correct string', () => {
  expect(nothavetestWithText.toString()).toBe('expect to not have "#test-nothave" with text "visible"')
})

test('Assertion "expect to not have" toString() generates correct string', () => {
  expect(nothavetestWithoutSel.toString()).toBe('expect to not have ""')
})