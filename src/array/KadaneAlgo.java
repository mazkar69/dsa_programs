package array;

public class KadaneAlgo {


    //Logics created by my me | return the max sum of subarray
    private static void findMaximumSubarraySum(int[] arr) {

      int totalSum = 0;
      int currentSum = 0;

      //We can find the maximum sub array in O(n), without taking extra pointer.
        for (int j : arr) {
            currentSum += j;
            if (currentSum > totalSum) {
                totalSum = currentSum;
            }
            if (currentSum < 0) {
                currentSum = 0;
            }
        }

        System.out.println("The maximum of these: " + totalSum);
    }

    //Logic created by me | return the start and end index of sub array
    private static void findMaxSubArrayPointer(int[] arr) {
        int totalSum = 0;
        int currentSum = 0;
        int start = 0;
        int end = 0;

        for (int i =0; i<arr.length; i++) {
            currentSum += arr[i];
            if (currentSum > totalSum) {
                totalSum = currentSum;
                end = i;
            }
            if (currentSum < 0) {
                currentSum = 0;
                start = i + 1;
                end = i + 1;
            }

        }

        System.out.println("Start Index: " + start + " End Index: " + end);
    }


    public static void main(String[] args) {
        int[] arr = {4, -1, 2, 1, -5, 4};
//        int[] arr = {-4, -1, -2, -1, 25, 4};

//        findMaximumSubarraySum(arr);
        findMaxSubArrayPointer(arr);
    }
}
