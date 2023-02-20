class Queue {
  constructor() {
    this.arr = [];
  }

  enqueue(value) {
    this.arr.push(value);
  }

  dequeue() {
    return this.arr.shift();
  }

  isEmpty() {
    return this.arr.length === 0;
  }
}

class BinaryTreeNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.parent = null;
  }

  get height() {
    const leftHeight = this.left ? 1 : 0;
    const rightHeight = this.right ? 1 : 0;

    return Math.max(leftHeight, rightHeight)
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
    }

    if (node) {
      this.left = node;
      this.left.parent = this;
    }
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null;
    }

    if (node) {
      this.right = node;
      this.right.parent = this;
    }
  }
}

function traverseBF(root, callback) { // breadth-first search
  const nodeQueue = new Queue();
  nodeQueue.enqueue(root);

  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue();

    callback(currentNode);

    if (currentNode.left) {
      nodeQueue.enqueue(currentNode.left)
    }

    if (currentNode.right) {
      nodeQueue.enqueue(currentNode.right)
    }
  }
}

function traverseDFRecursive(node, callback) { // depth-first search
  callback(node);

  if (node.left) {
    traverseDFRecursive(node.left, callback);
  }

  if (node.right) {
    traverseDFRecursive(node.right, callback);
  }
}

function traverseDF(root, callback) {
  traverseDFRecursive(root, callback);
}

const aNode = new BinaryTreeNode('a');

const bNode = new BinaryTreeNode('b');
const cNode = new BinaryTreeNode('c');
aNode.setLeft(bNode);
aNode.setRight(cNode);

const dNode = new BinaryTreeNode('d');
bNode.setRight(dNode);

const eNode = new BinaryTreeNode('e');
const fNode = new BinaryTreeNode('f');
cNode.setLeft(eNode);
cNode.setRight(fNode);

traverseDF(aNode, node => console.log(node.value))
traverseBF(aNode, node => console.log(node.value))