package array;
import java.util.*;


public class ArrayInFunction {

    public static void printSubject(int marks[]){

        for(int mark:marks){
            System.out.print(mark+" ");
        }
    }
    public static void main(String []args){

        Scanner sc = new Scanner(System.in);
        int []marks = new int[5];

        System.out.println("Enter the marks of your 5 subjects.");

        //Taking the input in the array
        for(int i = 0; i < marks.length; i++){
            System.out.println("Enter Marks " + (i+1) + ":");
            marks[i] = sc.nextInt();
        }


        //Print All the subject marks
        printSubject(marks);
    }
}
