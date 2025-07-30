package array.matrics;

import com.sun.tools.jconsole.JConsoleContext;

public class DigonalSum {

//    Only work for nxn matrix.
    public static void digonalSum(int [][]matrix){

        int n = matrix.length;
        int lastIndex = n-1;
        int totalSum = 0;


        //Loop through n times
        for(int i = 0; i<n; i++){

            //If the size of matrix is odd. just take the element once.
            if(lastIndex == i){
                totalSum += matrix[i][i];
                lastIndex--;
                continue;
            }

            //Primary Digonal
            totalSum += matrix[i][i];

            //Secondary Digonal
            totalSum += matrix[i][lastIndex];
            lastIndex--;

        }

        System.out.println("Total Digonal sum is " + totalSum);

    }

    public static void main(String []args){
        int [][]matrix = {{1,2,3,4}, {5, 6,7,8},{9,10,11,12},{13,14,15,16}};
        digonalSum(matrix);
    }
}
