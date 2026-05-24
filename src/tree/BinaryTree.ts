import Queue from "../queue/Queue";

class Node<T> {
    public left: Node<T> | null = null;
    public value: T;
    public right: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class Tree<T> {
    private root: Node<T> | null = null;
    private queue: Queue<Node<T>> = new Queue<Node<T>>();

    constructor(value:T) {
        const newNode: Node<T> = new Node<T>(value);
        this.root = newNode;
        this.queue.enqueue(newNode);
    }

    insert(value: T): void {
        const newNode: Node<T> = new Node<T>(value);
        const currentNode: Node<T> = this.queue.peek();

        if (currentNode.left === null) {
            currentNode.left = newNode;
        }else if (currentNode.right === null) {
            currentNode.right = newNode;
        }

        if (currentNode.left !== null && currentNode.right !== null) {
            this.queue.dequeue();
        }

        

        this.queue.enqueue(newNode);
    }

    preOrderTraversal(node: Node<T> | null = this.root): void {
        if (node === null) {
            return;
        }
        console.log(node.value);
        this.preOrderTraversal(node.left);
        this.preOrderTraversal(node.right);
    }

    inOrderTraversal(node: Node<T> | null = this.root): void {
        if (node === null) {
            return;
        }
        this.inOrderTraversal(node.left);
        console.log(node.value);
        this.inOrderTraversal(node.right);
    }

    postOrderTraversal(node: Node<T> | null = this.root): void {
        if (node === null) {
            return;
        }
        this.postOrderTraversal(node.left);
        this.postOrderTraversal(node.right);
        console.log(node.value);
    }
    
    levelOrderTraversal(node:Node<T>|null = this.root){
        if(node === null){
            return;
        }
        const queue = new Queue<Node<T>>();
        queue.enqueue(node);

        while(!queue.isEmpty()){
            const node:Node<T> = queue.dequeue();

            console.log(node.value);
            
            if(node.left){
                queue.enqueue(node.left);
            }
            if(node.right){
                queue.enqueue(node.right)
            }
        }


    }
}


// Example usage:
const tree = new Tree<number>(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

console.log("Pre-order Traversal:");
tree.preOrderTraversal();

console.log("In-order Traversal:");
tree.inOrderTraversal();

console.log("Post-order Traversal:");
tree.postOrderTraversal();

console.log("Level-order Traversal:");
tree.levelOrderTraversal();