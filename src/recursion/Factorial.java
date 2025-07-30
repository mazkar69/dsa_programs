package recursion;

public class Factorial {

    private static int factorial(int n ){
        if(n<=1){
            return 1;
        }
        return n * factorial(n-1);
    }

    public static void main(String []args){
        int facto = factorial(10);
        System.out.println("Factorial is: " + facto );
    }
}
