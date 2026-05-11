class ListNode{
    val:number;
    next:ListNode | null;
    constructor(val?:number, next?:ListNode){
        this.val = (val===undefined ? 0 : val);
        this.next = (next===undefined ? null : next);
    }
}
class MyLinkedList {

    head: ListNode | null = null;

    constructor() {
        this.head = null;
    }

    get(index: number): number {
        let current = this.head;
        let i = 0;
        while (current && i < index) {
            current = current.next;
            i++;
        }
        return current ? current.val : -1;
    }

    addAtHead(val: number): void {
        const newNode= new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
    }

    addAtTail(val: number): void {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    addAtIndex(index: number, val: number): void {
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        const newNode = new ListNode(val);
        let current = this.head;
        let prev: ListNode | null = null;
        let i = 0;
        while (current && i < index) {
            prev = current;
            current = current.next;
            i++;
        }
        if (prev) {
            prev.next = newNode;
            newNode.next = current;
        } else {
            this.head = newNode;
        }
    }

    deleteAtIndex(index: number): void {
        if (index < 0) return;
        if (index === 0 && this.head) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        let prev: ListNode | null = null;
        let i = 0;
        while (current && i < index) {
            prev = current;
            current = current.next;
            i++;
        }
        if (prev && current) {
            prev.next = current.next;
        }
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// Use casee
const linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1, 2);  // linked list becomes 1->2->3
console.log(linkedList.get(1));            // returns 2
