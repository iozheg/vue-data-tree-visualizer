import BinaryTreeNode from "./binaryTreeNode";

export default class BinaryTree {
  constructor(comparisionFunction, initialValue) {
    this.root = initialValue ? new BinaryTreeNode(initialValue) : null;
    this.maxLevel = 0;
    this.compare = (typeof comparisionFunction === "function")
      ? (a, b) => {
        try {
          return comparisionFunction(a, b);
        } catch (e) {
          return 0;
        }
      }
      : (a, b) => {
        if (a < b) return -1;
        return (a === b ? 0 : 1);
      };
  }

  insert(value) {
    if (!this.root) {
      this.root = new BinaryTreeNode(value);
      return;
    }

    const parentNode = this.searchNewPosition(value);
    const newNode = new BinaryTreeNode(value);

    const compResult = this.compare(value, parentNode.value);
    if (compResult === -1) {
      parentNode.leftChild = newNode;
    } else {
      parentNode.rightChild = newNode;
    }
  }

  searchNewPosition(value) {
    let parentNode = null;
    let currentNode = this.root;
    let currentLevel = 0;

    while (currentNode) {
      const compResult = this.compare(value, currentNode.value);
      parentNode = currentNode;
      currentNode = compResult === -1
        ? currentNode.leftChild
        : currentNode.rightChild;
      currentLevel++;
    }
    if (this.maxLevel < currentLevel) this.maxLevel = currentLevel;
    return parentNode;
  }

  search(value) {
    let currentNode = this.root;

    while (currentNode) {
      const compResult = this.compare(value, currentNode.value);
      if (compResult === 0) {
        return currentNode;
      }
      currentNode = compResult === -1
        ? currentNode.leftChild
        : currentNode.rightChild;
    }

    return currentNode;
  }

  preOrderTraversal(current = this.root, output = [], level = 0) {
    if (!output[level]) {
      // eslint-disable-next-line no-param-reassign
      output[level] = [];
    }

    output[level].push(current.value);
    const nextLevel = level + 1;

    if (current.leftChild) {
      this.preOrderTraversal(current.leftChild, output, nextLevel);
    }

    if (current.rightChild) {
      this.preOrderTraversal(current.rightChild, output, nextLevel);
    }

    return output;
  }
}
