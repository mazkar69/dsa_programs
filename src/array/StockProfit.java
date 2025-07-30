package array;



public class StockProfit {

    //This method will the max profit we can make by buying the shares in lowers price and sell in the max price.
    private static void maxProfit(int[] prices) {
        int maxProfit = 0;
        int lowestBuyPrice = prices[0];

        for(int i = 0; i < prices.length; i++){
            if(prices[i] > lowestBuyPrice){
                int  profit = prices[i] - lowestBuyPrice;
                if(profit > maxProfit){
                    maxProfit = profit;
                }
            }else{
                lowestBuyPrice = prices[i];
            }
        }

        System.out.println("Maximum profit is "+maxProfit);
    }

    public static void main(String[] args) {
        int[] prices = {7,1,5,3,6,4};

        maxProfit(prices);
    }
}
