
export { };
import { print, println } from "../util/io";

class Node<T> {
    value: T;
    left: Node<T> | null = null;
    right: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class BinarySearchTree<T> {

    root: Node<T> | null = null;

    insertNode(value: T): void {

        const newNode = new Node(value);

        // If three is empty, set root to new node
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let curr: Node<T> | null = this.root;
        let prev: Node<T> | null = null;

        while (curr) {
            if (value < curr.value) {
                prev = curr;
                curr = curr.left;
            } else if (value > curr.value) {
                prev = curr;
                curr = curr!.right;
            } else {
                // If the value already exists.
                return;
            }

        }

        value < prev!.value ? prev!.left = newNode : prev!.right = newNode;

    }

    rInsertNode(value: T): void {
        const newNode = new Node(value);
        function insert(node: Node<T> | null): Node<T> {
            if (!node) {
                return newNode;
            }
            if (value < node.value) {
                node.left = insert(node.left);
            } else if (value > node.value) {
                node.right = insert(node.right);
            }
            return node;
        }

        this.root = insert(this.root);
    }

    deleteNode(value: T): void {
        function deleteNodeHelper(node: Node<T> | null, value: T): Node<T> | null {
            if (!node) {
                return null;
            }
            if (value < node.value) {
                node.left = deleteNodeHelper(node.left, value);
            } else if (value > node.value) {
                node.right = deleteNodeHelper(node.right, value);
            } else {  // Node to be deleted found

                // Node with only one child or no child
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                // Node with two children: Get the inorder successor (smallest in the right subtree)
                let temp = node.right;
                while (temp.left) {
                    temp = temp.left;
                }
                node.value = temp.value; // Copy the inorder successor's content to this node
                node.right = deleteNodeHelper(node.right, temp.value); // Delete the inorder successor
            }
            return node;
        }

        this.root = deleteNodeHelper(this.root, value);
    }

    preOrder(node: Node<T> | null = this.root): void {
        if (!node) {
            return;
        }


        print(node.value, "");
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    inOrder(node: Node<T> | null = this.root): void {
        if (!node) {
            return;
        }
        this.inOrder(node.left);
        print(node.value, "");
        this.inOrder(node.right);
    }
    postOrder(node: Node<T> | null = this.root): void {
        if (!node) {
            return;
        }
        this.postOrder(node.left);
        this.postOrder(node.right);
        print(node.value, "")
    }
}


// Example usage:
const bst = new BinarySearchTree<number>();
bst.insertNode(5);
bst.insertNode(3);
bst.insertNode(7);
bst.rInsertNode(2);
bst.rInsertNode(4);
bst.rInsertNode(6);
bst.rInsertNode(8);
console.log("Pre-order Traversal:");
bst.preOrder();
