package array.sorting;

public class SelectionSort {

    private static void selectionSort(int []arr){

        for(int i = 0; i < arr.length; i++){
            int smallestValueIndex = i;

            //Find the smallest element index in the array
            for(int j = i+1; j < arr.length; j++){
                //Found the smallest value
                if( arr[smallestValueIndex] > arr[j] ){
                    smallestValueIndex = j;
                }
            }

            //Swap the value
            int temp = arr[i];
            arr[i] = arr[smallestValueIndex];
            arr[smallestValueIndex] = temp;
        }



        //Print the value in sorted order
        for(int val: arr){
            System.out.print(val + " ");
        }

    }

    public static void main(String []args){

        int []arr = {5,4,1,2,3};
        selectionSort(arr);
    }
}
