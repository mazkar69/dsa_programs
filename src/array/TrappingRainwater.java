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

    private static void findTrapperWaterOptimised(int heights[]){
        System.out.println("This is optimised version of the code which will take O(n)");
        int len = heights.length;

        int leftHighBorder[] = new int[len];
        int rightHighBorder[] = new int[len];

        leftHighBorder[0] = heights[0];
        rightHighBorder[len-1] = heights[len-1];


        // Finding the left high border
        for(int i = 1; i<len; i++){

            if(heights[i] > leftHighBorder[i-1]){
                leftHighBorder[i] = heights[i];
            }else{
                leftHighBorder[i] = leftHighBorder[i-1];
            }
        }


        // Finding the left high border
        for(int i = len-2; i>=0; i--){

            if(heights[i] > rightHighBorder[i+1]){
                rightHighBorder[i] = heights[i];
            }else{
                rightHighBorder[i] = rightHighBorder[i+1];
            }
        }

        int trappedWater = 0;

        // Calculating the trapped water
        for(int i = 0; i<len; i++){
            int max = Math.min(leftHighBorder[i], rightHighBorder[i]);
            int water = Math.max(0, (max-heights[i]));
            trappedWater += water;
        }

        System.out.println("Total trapped water: " + trappedWater);
    }
    public static void main(String []args){


        int []heights = {4,2,0,6,3,2,5};
//        int []heights = {1,2,3,4,5};
        findTrapperWaterOptimised(heights);
        findTrappedWater(heights);    // This will take O(n^2) time complexity.
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
