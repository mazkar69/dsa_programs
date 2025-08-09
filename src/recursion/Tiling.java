package recursion;


/*
* You are given a wall of size 2 x N. You have unlimited tiles of size 2 x 1 (vertical) and 1 x 2 (horizontal). In how many ways can you tile the wall using these tiles?

Input: An integer n representing the width of the wall (height is always 2).
Output: Return the number of different ways to tile the wall.
*
*
* ways(0) = 1  // empty wall = 1 way (do nothing)
ways(1) = 1  // only 1 vertical tile possible

* */
public class Tiling {



//    Time complexity is O(2 the power n)
    private static int ways(int n){

        if(n == 0 || n==1){
            return 1;
        }

        return ways(n-1) + ways(n-2);
    }


    //Time complexity is O(n) | Using memoization or DP(Dynamic Programming)
    private static int ways2(int n, int[] memo){
        if(n == 0 || n == 1) return 1;
        if(memo[n] != 0) return memo[n];

        memo[n] = ways2(n-1, memo) + ways2(n-2, memo);
        return memo[n];
    }


    public static void main(String[] args) {
        System.out.println(ways(4));
    }
}
