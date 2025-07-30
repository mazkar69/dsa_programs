package array;

public class TrappingRainwater {
    //This function will take O(n2); we can optimise this using auxiliaries array, then it will take O(n).
    private static void  findTrappedWater(int []heights){

        int sum = 0;

        for(int i=0;i<heights.length;i++){
            int leftMax = findMaxNumOfArray(heights,0,i-1);
            int rightMax = findMaxNumOfArray(heights,i+1,heights.length-1);

            if(leftMax > heights[i] &&  rightMax > heights[i]){
                int waterLevel = Math.min(leftMax,rightMax);
                sum += waterLevel -  heights[i];

            }
        }

        System.out.println("Trapped Water is "+sum);
    }

    public static void main(String []args){


//        int []heights = {4,2,0,6,3,2,5};
        int []heights = {1,2,3,4,5};
        findTrappedWater(heights);
    }

    private static int findMaxNumOfArray(int []arr,int startIndex,int endIndex){
        if(startIndex>endIndex){
            return 0;
        }
        int maxNum = Integer.MIN_VALUE;
        for(int i=startIndex;i<=endIndex;i++){
            maxNum = Math.max(maxNum,arr[i]);
        }
        return maxNum;
    }
}
