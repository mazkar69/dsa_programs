package array;


//We can reverse the array in two ways, either we create a copy of array and then run the reverse loop. This method will take the time complexity of O(n) and space O(n). But i am using the swap method which is more optimised way of reversing the array in O(n/2) time and take constant space.
public class Reverse {

    public static void main(String[] args) {
        int []arr = {1,2,3,4,5,6,7,8,9,10};


        //Reverse the array
        for(int i = 0; i < arr.length/2; i++){
            //Swap first from the last.
            int temp = arr[i];
            arr[i] = arr[arr.length-i-1];
            arr[arr.length-i-1] = temp;
        }


        for(int i : arr){
            System.out.print(i + " ");
        }

    }
}
