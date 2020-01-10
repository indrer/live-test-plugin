import LinkedList from '../../js/util/linkedList'

let linkedList = new LinkedList()
linkedList.addNode('aNode')

let linkedListMany = new LinkedList()
linkedListMany.addNode('bNode')
linkedListMany.addNode('cNode')
linkedListMany.addNode('dNode')

test('String Node has been added', () => {
  expect(linkedList.toString()).toBe('aNode')
})

test('Test for not existing Nodes', () => {
  expect(linkedList.toString()).toEqual(expect.not.stringContaining('newNode'))
})

test('Middle Node exists in List', () => {
  expect(linkedListMany.toString()).toEqual(expect.stringContaining('cNode'))
})
