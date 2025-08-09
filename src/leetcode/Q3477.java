package leetcode;

public class Q3477 {


    //This will time complexity O(n^2)
    public static int numOfUnplacedFruits(int[] fruits, int[] baskets) {
        int unPlacedItems = 0;
        int size = fruits.length;

        for(int i = 0; i<size; i++){
            boolean isPlaced = false;

            for(int j = 0; j<size; j++){

                if(fruits[i] <= baskets[j]){
                    isPlaced = true;
                    baskets[j] = 0;
                    break;
                }
            }

            if(!isPlaced){
                unPlacedItems += 1;
            }
        }

        return unPlacedItems;
    }



    public static void main(String []args){

        int []fruits = {3,6,1};
        int []baskets = {6,4,7};


        System.out.println(numOfUnplacedFruits(fruits,baskets));
    }
}
