package array.sorting;

public class BubbleSort {

    private static void bubbleSort(int []arr){

        for(int i = 0; i < arr.length; i++){
            for(int j = i+1; j < arr.length; j++){
                //Swap the smallest value in the first place
                if(arr[i] > arr[j]){
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }


        //Printing Sorted value
        for(int val:arr){
            System.out.print(val + " ");
        }
    }
    public static void main(String []arg){

        int []arr = {5,4,1,2,3};

        bubbleSort(arr);
    }
}
