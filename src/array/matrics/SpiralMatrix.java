package array.matrics;

import com.sun.tools.jconsole.JConsoleContext;

public class SpiralMatrix {

    //This is my personal logic but the problem is it only word for nxn matrix with even row and colum
    public static void printSpiralMatrix(int[][] matrix) {

        //Find the n and m of the matrix.
        int n = matrix.length;              //Row
        int m = matrix[0].length;           //Column


        //Initialise the borders
        int startColumn = 0;
        int startRow = 0;
        int endColumn = m - 1;
        int endRow = n - 1;


        //Loop half of the n/2
        for (int k = 0; k <= n / 2; k++) {

            //Print the top Border; j for row
            for (int j = startColumn; j < endColumn; j++) {
                System.out.print(matrix[startRow][j] + " ");
            }


            //Print right border; i for row
            for (int i = startRow; i < endRow; i++) {
                System.out.print(matrix[i][endColumn] + " ");
            }


            //Print Bottom Border j for column
            for (int j = endColumn; j > startColumn; j--) {
                System.out.print(matrix[endRow][j] + " ");
            }

            //Print the Left Border
            for(int i = endRow; i > startRow; i--){
                System.out.print(matrix[i][startColumn]+" ");
            }


            //Update the border
            startColumn++;
            startRow++;

            endColumn--;
            endRow--;

        }


    }


    //This is more optimised way to spiralMatrix.
    public static void printSpiralMatrix2(int[][] matrix) {
        int startRow = 0, endRow = matrix.length - 1;
        int startCol = 0, endCol = matrix[0].length - 1;

        while (startRow <= endRow && startCol <= endCol) {

            // 👉 Top row (left to right)
            for (int j = startCol; j <= endCol; j++) {
                System.out.print(matrix[startRow][j] + " ");
            }
            startRow++;

            // 👉 Right column (top to bottom)
            for (int i = startRow; i <= endRow; i++) {
                System.out.print(matrix[i][endCol] + " ");
            }
            endCol--;

            // 👉 Bottom row (right to left)
            if (startRow <= endRow) {
                for (int j = endCol; j >= startCol; j--) {
                    System.out.print(matrix[endRow][j] + " ");
                }
                endRow--;
            }

            // 👉 Left column (bottom to top)
            if (startCol <= endCol) {
                for (int i = endRow; i >= startRow; i--) {
                    System.out.print(matrix[i][startCol] + " ");
                }
                startCol++;
            }
        }
    }


    public static void main(String[] str) {

        int[][] matrix = {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 0}, {2, 4, 6, 3, 5}, {9, 7, 8, 5, 7}, {1, 2, 3, 5, 5}};

        printSpiralMatrix2(matrix);


    }
}
