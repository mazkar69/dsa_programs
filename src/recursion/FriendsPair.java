package recursion;
//Given n friends, each one can remain single or can be paired up with some other friend. Each friend can be paired only once. Find out the total number of ways in which friends can remain single or can be paired up.

public class FriendsPair {

    private static int noOfWays(int n){
        if(n == 1 || n== 2){
            return n;
        }

        return noOfWays(n-1) + ((n-1) * noOfWays(n-2));
    }
    public static void main(String []args){

        int totalWays = noOfWays(10);

        System.out.println("Total number of ways: " + totalWays);
    }
}
