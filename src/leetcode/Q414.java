package leetcode;
import java.util.*;

public class Q414 {


    //This will handle the negative value also. Taking time complexity of O(nLogn);
    public static int thirdMax(int[] nums) {

        Arrays.sort(nums);
        int n = nums.length;
        int max = nums[n-1];
        if(n == 2){
            return max;
        }

        int count = 1;
        int i = n-1;

        for(i = i-1; i>=0; i--){

            if(nums[i] < max){
                count++;
                max = nums[i];

                if(count == 3){
                    break;
                }
            }

        }

        if(count == 3){
            return nums[i];
        }
        return nums[n-1];
    }

    public static void main(String []args){

        int nums[] = {1,2,3};
        int thirdMax = thirdMax(nums);
        System.out.println(thirdMax);
    }
}
