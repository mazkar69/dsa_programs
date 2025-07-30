package array.sorting;



public class IntertionSort {

    private static void intertionSort(int []arr){

        for(int i = 1; i < arr.length; i++){
            int key = arr[i];
            int j = i -1;

            while(j >= 0 && arr[j] > key){
                arr[j+1] = arr[j];
                j= j-1;
            }

            arr[j + 1] = key;
        }

        for(int val:arr){
            System.out.print(val + " ");
        }
    }

    public static void main(String []args){
        int []arr = {5,4,1,2,3};
        intertionSort(arr);
    }
}
