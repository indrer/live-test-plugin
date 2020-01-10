import Action from '../js/livetest-model/action'
import { VISITACT, CLICKACT, EXECUTEACT } from '../js/livetest-model/actionType'

let visitAction = new Action(VISITACT, '', 'https://lnu.se')
let visitActionNoText = new Action(VISITACT, '', '')

let clickAction = new Action(CLICKACT, '#click-test-id', 'a div')
let clickActionNoText = new Action(CLICKACT, '#click-test-id', '')

let executeAction = new Action(EXECUTEACT, '', 'alert("Hi")')
let executeActionNoJs = new Action(EXECUTEACT, '', '')

test('Action of type visit generates correct string with toString()', () => {
  expect(visitAction.toString()).toBe('visit "https://lnu.se"')
})

test('Action of type visit detects wrong link', () => {
  expect(visitAction.toString()).toEqual(expect.not.stringContaining('visit "https://lipsum.se"'))
})

test('Action of type visit (not text) generates correct string with toString()', () => {
  expect(visitActionNoText.toString()).toBe('visit ""')
})

test('Action of type visit (not text) detects existing text', () => {
  expect(visitActionNoText.toString()).toEqual(expect.not.stringContaining('visit "https://lipsum.se"'))
})

test('Action of type click (with text) generates correct string with toString()', () => {
  expect(clickAction.toString()).toBe('click "#click-test-id" with text "a div"')
})

test('Action of type click (with text) detects wrong text', () => {
  expect(clickAction.toString()).toEqual(expect.not.stringContaining('click "#click-wrong-id" with wrong text "a p"'))
})

test('Action of type click (without text) generates correct string with toString()', () => {
  expect(clickActionNoText.toString()).toBe('click "#click-test-id"')
})

test('Action of type click (without text) detects wrong text', () => {
  expect(clickActionNoText.toString()).toEqual(expect.not.stringContaining('click "#click-wrong-id"'))
})

test('Action of type execute generates correct string with toString()', () => {
  expect(executeAction.toString()).toBe('execute {{ alert("Hi") }}')
})

test('Action of type execute detects no code provided', () => {
  expect(executeAction.toString()).toEqual(expect.not.stringContaining('execute {{ }}'))
})

test('Action of type execute (without provided code) generates correct string with toString()', () => {
  expect(executeActionNoJs.toString()).toBe('execute {{  }}')
})

test('Action of type execute (without provided code) detects code is provided', () => {
  expect(executeActionNoJs.toString()).toEqual(expect.not.stringContaining('execute {{ alert("Hi") }}'))
})