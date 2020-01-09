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

test('Action of type visit (not text) generates correct string with toString()', () => {
  expect(visitActionNoText.toString()).toBe('visit ""')
})

test('Action of type click (with text) generates correct string with toString()', () => {
  expect(clickAction.toString()).toBe('click "#click-test-id" with text "a div"')
})

test('Action of type click (without text) generates correct string with toString()', () => {
  expect(clickActionNoText.toString()).toBe('click "#click-test-id"')
})

test('Action of type execute generates correct string with toString()', () => {
  expect(executeAction.toString()).toBe('execute {{ alert("Hi") }}')
})

test('Action of type execute (without provided code) generates correct string with toString()', () => {
  expect(executeActionNoJs.toString()).toBe('execute {{  }}')
})