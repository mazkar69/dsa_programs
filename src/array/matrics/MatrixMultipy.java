package array.matrics;

public class MatrixMultipy {
    public static void main(String []args){

        int [][]matrix1 = {
                {1,2,3},
                {4,5,6},
                {7,8,9}
        };

        int [][]matrix2 = {
                {1,4,0},
                {2,3,7},
                {9,0,1}
        };

        int n = matrix1.length;
        int [][]mulMat = new int[n][n];


        for(int i = 0; i<n; i++){
            for(int j = 0; j<n; j++){
                int elemSum = 0;
                for(int k = 0; k < n; k++){
                    elemSum += matrix1[i][k] * matrix2[k][j];
                }

                System.out.print(elemSum + " ");
            }
            System.out.println();
        }
    }
}
