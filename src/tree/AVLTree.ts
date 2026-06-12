import { print } from "../util/io";

class Node<T> {
    left: Node<T> | null = null;
    val: T;
    right: Node<T> | null = null;
    constructor(val: T) {
        this.val = val;
    }
}


class AVLT<T> {

    root: Node<T> | null = null;

    rInsert(val: T) {

        
        const insert = (node: Node<T> | null): Node<T> | null => {

            if (node === null) {
                const newNode = new Node<T>(val);
                return newNode;
            }

            if (node.val < val) {
                node.right = insert(node.right);
            } else if (node.val > val) {
                node.left = insert(node.left);
            }

            //Make the node balance if unbalanced.
            if(this.balanceFactor(node) === 2){
                if(this.balanceFactor(node.left!) === 1){
                    //LL case   
                    const l = node.left!;
                    const lr = node.left!.right;

                    l.right = node;
                    node.left = lr;
                    return l;
                }
                else if(this.balanceFactor(node.left!) === -1){
                    //LR case
                    const l = node.left!;
                    const lr = node.left!.right;
                    const lrl = node.left!.right!.left;
                    const lrr = node.left!.right!.right;

                    lr!.left = l;
                    lr!.right = node;
                    l.right = lrl;
                    node.left = lrr;
                    return lr;
                }
            }else if(this.balanceFactor(node) === -2){
                if(this.balanceFactor(node.right!) === -1){
                    //RR case
                    const r = node.right!;
                    const rl = node.right!.left;

                    r.left = node;
                    node.right = rl;
                    return r;
                }
                else if(this.balanceFactor(node.right!) === 1){
                    //RL case
                    const r = node.right!;
                    const rl = node.right!.left;
                    const rll = node.right!.left!.left;
                    const rlr = node.right!.left!.right;
                    rl!.left = node;
                    rl!.right = r;
                    node.right = rll;
                    r.left = rlr;
                    return rl;
                }
            }



            return node;
        }
        this.root = insert(this.root);

    }
    preOrder(node: Node<T> | null = this.root) {

        if (node === null) {
            return;
        }
        print(node.val + " ");

        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    inOrder(node: Node<T> | null = this.root) {

        if (node === null) {
            return;
        }
        this.inOrder(node.left);
        print(node.val + " ");
        this.inOrder(node.right);
    }
    postOrder(node: Node<T> | null = this.root) {

        if (node === null) {
            return;
        }
        this.postOrder(node.left);
        this.postOrder(node.right);
        print(node.val + " ");

    }
    getHeight(node: Node<T> | null = this.root): number {

        if (node === null) {
            return 0;
        }
        let lHeight = this.getHeight(node.left);
        let rHeight = this.getHeight(node.right);
        return Math.max(lHeight, rHeight) + 1;
    }
    balanceFactor(node:Node<T>):number{
        let lH = this.getHeight(node.left);
        let rH = this.getHeight(node.right);
        return lH - rH;
    }
}

const t = new AVLT<number>();

t.rInsert(40);
t.rInsert(30);
t.rInsert(20);
t.rInsert(10);
t.rInsert(25);
t.rInsert(35);
t.rInsert(50);
t.rInsert(45);
t.rInsert(60);
t.rInsert(55);
t.inOrder();

export { };