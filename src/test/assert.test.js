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

// ========= See tests // expect to not contain =========
test('Assertion "expect to see" toString() detect wrong string', () => {
  expect(seetest.toString()).toEqual(expect.not.stringContaining('expect to see "#wrong-see"'))
})

test('Assertion "expect to see" with text toString() detect empty string', () => {
  expect(seetestWithText.toString()).toEqual(expect.not.stringContaining('expect to see ""'))
})

test('Assertion "expect to see" without selector toString() detect non empty string', () => {
  expect(seetestWithoutSel.toString()).toEqual(expect.not.stringContaining('expect to see "#test-see" with text "visible"'))
})

// ========= Not see tests // expect to not contain =========
test('Assertion "expect to not see" toString() detect wrong string', () => {
  expect(notseetest.toString()).toEqual(expect.not.stringContaining('expect to not see "#wrong-notsee"'))
})

test('Assertion "expect to not see" with text toString() detect empty string', () => {
  expect(noteseetestWithText.toString()).toEqual(expect.not.stringContaining('expect to not see ""'))
})

test('Assertion "expect to not see" toString() detect non empty string', () => {
  expect(noteseetestWithoutSel.toString()).toEqual(expect.not.stringContaining('expect to not see "#test-notsee"'))
})

// ========= Have tests // expect to not contain =========
test('Assertion "expect to have" toString() detect wrong string', () => {
  expect(havetest.toString()).toEqual(expect.not.stringContaining('expect to have "#wrong-have"'))
})

test('Assertion "expect to have" with text toString() detect empty string', () => {
  expect(havetestWithText.toString()).toEqual(expect.not.stringContaining('expect to have ""'))
})

test('Assertion "expect to have" without selector toString() detect non empty string', () => {
  expect(havetestWithoutSel.toString()).toEqual(expect.not.stringContaining('expect to have "#test-have"'))
})

// ========= Not have tests // expect to not contain =========
test('Assertion "expect to not have" toString() detect wrong string', () => {
  expect(nothavetest.toString()).toEqual(expect.not.stringContaining('expect to not have "#wrong-nothave"'))
})

test('Assertion "expect to not have" toString() detect empty string', () => {
  expect(nothavetestWithText.toString()).toEqual(expect.not.stringContaining('expect to not have ""'))
})

test('Assertion "expect to not have" toString() detect not empty string', () => {
  expect(nothavetestWithoutSel.toString()).toEqual(expect.not.stringContaining('expect to not have "#test-nothave"'))
})