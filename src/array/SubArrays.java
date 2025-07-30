package array;
//Print all the subarray from a array. Run the code to see the output.
public class SubArrays {
    public static void main(String[] args) {
        int []arr = {1,2,3,4,5,6,7,8,9};


//        O(n^3)
        for (int i = 0; i<arr.length; i++){
            for (int j = i+1; j<arr.length; j++){
                for (int k = i; k<=j; k++){
                    System.out.print(arr[k] );
                }
                System.out.print(" ");
            }
            System.out.println();
        }
    }
}
