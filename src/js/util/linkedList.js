class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }

  getNext () {
    return this.next
  }

  getData () {
    return this.data
  }

  addNext (nextNode) {
    this.next = nextNode
  }
}

export default class LinkedList {
  constructor () {
    console.log('This works!')
    this.head = null
    this.tail = null
  }

  addNode (data) {
    if (this.head == null) {
      this.head = new Node(data)
      this.tail = this.head
    } else {
      this.tail.addNext(new Node(data))
      this.tail = this.tail.getNext()
    }
  }
}

