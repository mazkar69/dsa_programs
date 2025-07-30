package linkedlist;


class Node {
    public int data;
    public Node next = null;
    public Node prev = null;
}


//Doubly LinkedList
public class LinkedList {
    private final Node head = new Node();
    private final Node tail = new Node();


    //O(1)
    void addToEnd(int data){
        Node newNode = new Node();
        newNode.data = data;

        //Check if the list is empty and it's the first element
        if(head.next == null){
            head.next = newNode;
            newNode.prev = head;
            tail.prev = newNode;
        }else{
            Node lastNode = tail.prev;
            tail.prev = newNode;
            lastNode.next = newNode;
            newNode.prev = lastNode;
        }

        System.out.println("New Node added to the LinkedList!");
        return;
    }

    // O(1)
    void addToHead(int data){

        Node newNode = new Node();
        newNode.data = data;

        //If the list is empty
        if(head.next == null){

            head.next = newNode;
            tail.prev = newNode;
            newNode.prev = head;

        }else{

            newNode.next = head.next;
            newNode.prev = head;
            head.next = newNode;

        }


    }

    //O(n)
    void printList(){
        Node temp = head.next;

        while(temp != null){
            System.out.print(temp.data + " ");
            temp = temp.next;
        }

        System.out.println();
    }

    void printReverseList(){
        Node lastNode = tail.prev;

        System.out.println("Reverse List");
        while(lastNode.prev != null){
            System.out.print(lastNode.data + " ");
            lastNode = lastNode.prev;
        }
        System.out.println();

    }

    public static void main(String[] args){
        System.out.println("Welcome to the Queue Demo!");
        LinkedList linkedList = new LinkedList();
        linkedList.addToEnd(10);
        linkedList.addToEnd(20);
        linkedList.addToHead(5);
        linkedList.addToHead(2);
        linkedList.printList();
        linkedList.printReverseList();
    }

}
