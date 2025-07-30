package array;

//This is the method 1 which is prefix sum
public class SubArraySumMeth1 {

    public static void main(String[] args) {
//        int[] arr = {1, -2, 6, -1, 3}; //maximum sun array is 18 from index 2 to 4
        int[] arr = {20, -25, 4, 4, 7,9}; //maximum sun array is 18 from index 2 to 4
        int[] prefix = new int[arr.length];
        prefix[0] = arr[0];

        for (int i = 1; i < arr.length; i++) {
            prefix[i] = arr[i] + prefix[i - 1];
        }

        for(int x: prefix){
            System.out.print(x + " ");
        }
        System.out.println();

        int sum = prefix[0];

        for (int i = 0; i < arr.length; i++) {
            int start = i;
            for (int j = i + 1; j < arr.length; j++) {
                int end = j;

//                currentSum = prefix[end] - prefix[start -1]    => This is the formula.
                int currentSum = start == 0 ? prefix[end] : prefix[end] - prefix[start-1];
                if (sum < currentSum) {
                    sum = currentSum;
                }
            }
        }

        System.out.println("Maximum Subarray Sum is " + sum);
    }
}


/*
Explanation
*
*
*
*
* */