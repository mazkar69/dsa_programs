package leetcode;

public class Q121 {

    public static int maxProfit(int[] prices) {

        int n = prices.length;
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;

        int maxProfit = 0;

        for(int i = 0; i<n; i++){

            int cValue = prices[i];
            if(prices[i] < min){
                min = cValue;
                max = cValue;
            }else{
                max = Math.max(max,cValue);
                if((max - min) > maxProfit){
                    maxProfit = max-min;
                }
            }

        }

        return maxProfit;

    }
    public static void main(String []args){
        int []Prices = {7,1,5,3,6,4};

        int maxProfit = maxProfit(Prices);
        System.out.println("Maximum profit: " + maxProfit);
    }
}
