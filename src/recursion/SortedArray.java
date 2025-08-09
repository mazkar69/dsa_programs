package recursion;


//Check if an array is sorted or not using the recursion.
public class SortedArray {

    public static boolean isSorted(int []arr, int i){

        if(i == arr.length -1){
            return true;
        }
        if(arr[i] > arr[i+1]){
            return false;
        }

        return isSorted(arr,i+1);
    }

    public static void main(String []str){

        int []arr = {2,3,4,5,6,7,76,100};
        System.out.println(isSorted(arr,0));
    }

}
