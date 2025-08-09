package leetcode;

public class Q904 {
    //My Solution | O(n) in both best and worst case.
    public static int totalFruit(int[] fruits) {
        int n = fruits.length;

        if(n == 1 || n ==2){
            return n;
        }

        int leftPointer = 0;
        int rightPointer = 1;

        int basket1 = fruits[leftPointer];
        int basket2 = fruits[rightPointer];

        int max = 1;

        for(int i = 2; i<n; i++){


            if((fruits[i] == basket1) || (fruits[i] == basket2) || (basket1 == basket2)){
                System.out.println("inside If");
                rightPointer = i;

                //If the both basket has same value then update the second basket with the new value
                if(basket1 == basket2){
                    basket2 = fruits[i];
                }

            }else{          //Next element is not in both basket.

                //update the left pointer index.
                int lastElem = fruits[rightPointer];
                int lastPointerIndex = leftPointer;
                for(int j = rightPointer; j>lastPointerIndex; j--){
                    if(fruits[j] == lastElem){
                        leftPointer = j;
                    }else{
                        break;
                    }
                }

                //Update the right pointer with the new value
                rightPointer = i;


                //Update the basket, Here Both basket will have different value.
                basket1 = fruits[leftPointer];
                basket2 = fruits[rightPointer];
            }

            int diff = rightPointer - leftPointer;


            if(diff > max){
                max = diff;
            }


        }

        return max+1;


    }


    public static void main(String []args){
       int []fruits = {0,1,6,6,4,4,6};


       int totalFruitsPicked = totalFruit(fruits);

        System.out.println(totalFruitsPicked);
    }
}
