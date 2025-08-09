package recursion;

public class Fibonacci {

    //This function will return the value of n term like 5 term is 5 & 7 term is 21. counting from 0;
    private static int findFino(int n){
        if(n == 0 || n ==1){
            return n;
        }

        //This method can be optimised using memoization.

        return findFino(n-2) + findFino(n-1);
    }

    private static void generateFibonacci(int count) {
        generateFibonacci(count, 0, 1);
    }

    // Main logic method | Java does not support default parameter in function.
    private static void generateFibonacci(int count, int sTerm, int fTerm) {
        if (count == 0) {
            return;
        }

        int nextTerm = sTerm + fTerm;
        System.out.print(nextTerm + " ");
        generateFibonacci(count - 1, fTerm, nextTerm);
    }

    public static void main(String []args){


        generateFibonacci(10);

        System.out.println(findFino(5));
    }
}
