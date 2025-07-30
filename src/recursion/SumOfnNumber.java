package recursion;

public class SumOfnNumber {

    private static int addNumber(int n){

        if(n == 0){
            return 0;
        }
        else {
            return n += addNumber(n-1);
        }
    }

    public static void main(String []args){
        System.out.println("This is test program");

       int totalSum =  addNumber(10);
        System.out.println("Total sum is: " + totalSum);

    }
}
