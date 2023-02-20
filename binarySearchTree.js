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

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value, comparator) { // comparator functions compare node to correspond BinarySearchTree requirements
    super(value);
    this.comparator = comparator;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }

    return false
  }

  insert(value) {
    if (this.comparator(value, this.value) < 0) {
      if (this.left) return this.left.insert(value);

      const newNode = new BinarySearchTreeNode(value, this.comparator);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.comparator(value, this.value) > 0) {
      if (this.right) return this.right.insert(value);

      const newNode = new BinarySearchTreeNode(value, this.comparator);
      this.setRight(newNode);

      return newNode;
    }
  }

  find(value) {
    if (this.comparator(this.value, value) === 0) return this;

    if (this.comparator(this.value, value) < 0)
      return this.left.find(value);

    if (this.comparator(this.value, value) > 0)
      return this.right.find(value)

    return null
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) return false;

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }


}

class BinarySearchTree {
  constructor(value, comparator) {
    this.root = new BinarySearchTreeNode(value, comparator);
    this.comparator = comparator;
  }

  insert(value) {
    if (!this.root.value) this.root.value = value
    this.root.insert(value);
  }

  find(value) {
    return this.root.find(value);
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found');
    }

    const parent = nodeToRemove.parent;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove)
      }
      else {
        nodeToRemove.value = undefined;
      }
    }
    else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (this.comparator(nextBiggerNode, nodeToRemove.right) === 0) {
        nodeToRemove.value = nodeToRemove.right.value;
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
      else {
        this.remove(nextBiggerNode.value);
      }
    }
    else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      }
      else {
        this.root = childNode;
      }
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

const tree = new BinarySearchTree(8, (a, b) => a - b);
tree.insert(3);
tree.insert(10);
tree.insert(1);
tree.insert(6);
tree.insert(4);
tree.insert(7);
tree.insert(14);
tree.insert(13);

traverseBF(tree.root, node => console.log(node.value))