

class Heap<T> {
    private items: T[] = [];

    private compare(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
    private swap(i: number, j: number): void {
        const temp = this.items[i];
        this.items[i] = this.items[j];
        this.items[j] = temp;
    }

    private heapifyUp(index: number): void {
        let parentIndex = Math.floor((index - 1) / 2);
        if (index > 0 && this.compare(this.items[index], this.items[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            this.heapifyUp(parentIndex);
        }
    }

    private heapifyDown(index: number): void {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
        if (leftChildIndex < this.items.length && this.compare(this.items[leftChildIndex], this.items[smallestIndex]) < 0) {
            smallestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.items.length && this.compare(this.items[rightChildIndex], this.items[smallestIndex]) < 0) {
            smallestIndex = rightChildIndex;
        }
        if (smallestIndex !== index) {
            this.swap(index, smallestIndex);
            this.heapifyDown(smallestIndex);
        }
    }

    public insert(item: T): void {
        this.items.push(item);
        this.heapifyUp(this.items.length - 1);
    }

    public extractMin(): T | undefined {
        if (this.items.length === 0) return undefined;
        const min = this.items[0];
        const last = this.items.pop()!;
        if (this.items.length > 0) {
            this.items[0] = last;
            this.heapifyDown(0);
        }
        return min;
    }

    // Extract all elements from the heap and return them in sorted order. NOTE: This will empty the heap. 
    public extractAll(): T[] {
        const result: T[] = [];
        while (this.items.length > 0) {
            result.push(this.extractMin()!);
        }
        return result;
    }

    public peek(): T | undefined {
        return this.items[0];
    }
    public size(): number {
        return this.items.length;
    }
    public print(): void {        
        console.log(this.items);
    }
}

const minHeap = new Heap<number>();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
minHeap.insert(4);
minHeap.insert(7);
minHeap.print();
console.log(minHeap.extractAll()); 
minHeap.print();