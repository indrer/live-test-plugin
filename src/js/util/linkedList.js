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

  toString () {
    return this.data.toString()
  }
}

export default class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.size = 0
  }

  addNode (data) {
    this.size++
    if (this.head == null) {
      this.head = new Node(data)
      this.tail = this.head
    } else {
      this.tail.addNext(new Node(data))
      this.tail = this.tail.getNext()
    }
  }

  getSize () {
    return this.size
  }

  getHeadNode () {
    return this.head
  }

  toString () {
    if (this.head == null) {
      return ''
    }
    if (this.tail === this.head) {
      return this.head.getData().toString()
    }
    let resultString = ''
    let currentNode = this.head
    while (currentNode.getNext() !== null) {
      resultString = resultString + currentNode.getData().toString() + '\n'
      currentNode = currentNode.getNext()
    }
    resultString = resultString + currentNode.getData().toString()
    return resultString
  }
}
