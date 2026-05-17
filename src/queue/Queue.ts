
// This is the implementation of a generic Queue data structure in TypeScript. The Queue class uses an array to store the elements and maintains pointers for the front and rear of the queue. It provides methods to enqueue, dequeue, peek, and check if the queue is empty or full. The example usage demonstrates how to use the Queue class with numbers.
class Queue<T> {
    private items: T[];
    private size: number = 0;
    private front: number = 0;
    private rear: number = 0;

    constructor(size: number = 100) {
        this.items = new Array<T>(size);
        this.size = size;
    }
    isEmpty(): boolean {
        return this.front === this.rear;
    }
    isFull(): boolean {
        return (this.rear + 1) % this.size === this.front;
    }

    enqueue(item: T): void {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        this.items[this.rear] = item;
        this.rear = (this.rear + 1) % this.size;
    }
    dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        const item = this.items[this.front];
        this.front = (this.front + 1) % this.size;
        return item;
    }

    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.front];
    }

}

export default Queue;

// Example usage:
const queue = new Queue<number>(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue()); // Output: 1
console.log(queue.peek()); // Output: 2
queue.enqueue(4);
queue.enqueue(5);
console.log(queue.isFull()); // Output: true