package array;

import java.util.Scanner;

public class LinearSearch {

    private static boolean linerSearch(int []marks, int target){

        boolean flag = false;

        for(int i = 0; i<marks.length; i++){
            if(marks[i] == target){
                flag = true;
                return  flag;
            }
        }

        return flag;
    }

    public static void main(String []args){

        Scanner sc = new Scanner(System.in);

        //Marks array
        int []marks = {45,67,87,34,90};
        int target = 45;  //Default;

        System.out.println("Enter the numbers to find:");
        target = sc.nextInt();
        if(linerSearch(marks, target)){
            System.out.println("Your subject is found");
        }else{
            System.out.println("Your subject is not found");
        }

    }
}
