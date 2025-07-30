package array.matrics;

public class SortedMatrixSearch {

    public static boolean searchElement(int [][]matrix, int target){
        int m = matrix.length;
        int n = matrix[0].length;

        int lastElementRow = 0;
        int lastElementColumn = n-1;


        while(lastElementRow <= m-1 && lastElementColumn >= 0){

            int val = matrix[lastElementRow][lastElementColumn];

            if(val == target){
                return true;
            }else if(val > target){
                lastElementColumn--;
            }else if(val < target){
                lastElementRow++;
            }
        }

        return false;


    }

    public static void main(String []args){

        //This is the shorted matrix, both row wise and column wise.
        int[][] matrix = {
                {10, 20, 30, 40},
                {15, 25, 35, 45},
                {27, 29, 37, 48},
                {32, 33, 39, 50},
        };

        boolean isAvailable = searchElement(matrix,450);

        System.out.println(isAvailable ? "Element Available in the matrix" : "Element not available in the matrix");
    }
}
