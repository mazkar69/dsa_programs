package array;

import java.util.Scanner;


//Binary search time complexcity in big0 is log base 2
public class BinarySearch {

    private static boolean binarySearch(int []list, int target){
        boolean flag = false;

        int lower = 0, upper = list.length - 1;
        int mid;

        while(lower<=upper){
            mid = (lower + upper)/2;
            if(list[mid]==target){
                return true;
            }
            else if(list[mid]>target){
                upper = mid-1;
            }
            else {
                lower = mid+1;
            }
        }

        return flag;
    }

    public static void main(String[] args) {
        System.out.println("Enter the number which you want to search:");
        Scanner sc = new Scanner(System.in);

        //Initialing Array with 10 elements
        int []marks = {10,20,30,40,50,60,70,80,90,100};
        int target = sc.nextInt();

        boolean isPresent = binarySearch(marks,target);

        System.out.println(isPresent?"Yes":"No");



    }

}
