import LinkedList from '../js/util/linkedList'

let linkedList = new LinkedList()
linkedList.addNode('aNode')

test('addStringNode', () => {
  expect(linkedList.toString()).toBe('aNode')
})
