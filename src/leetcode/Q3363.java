package leetcode;

//Solved with the help of reference and solution.
public class Q3363 {

    public static int maxCollectedFruits(int[][] fruits) {
        int n = fruits.length;
        for(int i = 1; i < n; i++) {
            fruits[i][i] += fruits[i-1][i-1];
            for(int j = i+1; j < n; j++) {


                fruits[i][j] += Math.max(j == n-1 ? 0 : fruits[i-1][j+1], i + j == n-1 ? 0 : Math.max(fruits[i-1][j], j == 0 || i + j <= n ? 0 : fruits[i-1][j-1]));
                fruits[j][i] += Math.max(j == n-1 ? 0 : fruits[j+1][i-1], i + j == n-1 ? 0 : Math.max(fruits[j][i-1], j == 0 || i + j <= n ? 0 : fruits[j-1][i-1]));
            }
        }
        return fruits[n-1][n-2] + fruits[n-2][n-1] + fruits[n-1][n-1];
    }

        public static void main(String []args){


            int [][]fruits = {{1,2,3,4},{5,6,8,7},{9,10,11,12},{13,14,15,16}};

            int totalSum = maxCollectedFruits(fruits);

            System.out.println("Total sum is:" + totalSum);
        }
}
