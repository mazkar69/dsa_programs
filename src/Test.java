public class Test {

    public static void main(String []args){

//        int matric[][] = new int[][]{{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
//        int n = 4;


        int matric[][] = new int[][]{{1,2,3,4,5,6},{7,8,9,10,11,12},{13,14,15,16,17,18},{19,20,21,22,23,24}, {25,26,27,28,29,30}, {31,32,33,34,35,36}};
        int m = 6;
        int n = 6;

        for(int i = 0; i<m/2; i++){

            // Print top border
            int row = i;
            int column = i;
            for(; column<m-i; column++){
                System.out.print(matric[row][column] + " ");
            }


            //Print right border
            column--;
            for(row = row+1; row < (m-i); row++ ){
                System.out.print(matric[row][column] + " ");
            }

            row--;
            column--;
            //Print Bottom border
            for(; column >= i; column--){
                System.out.print(matric[row][column] + " ");
            }


            column++;
            row--;
            for(; row>i; row--){
                System.out.print(matric[row][column] + " ");
            }

        }

        //Print the odd element
        if((m % 2) != 0){
            System.out.print(matric[m/2][m/2]);
        }

    }
}