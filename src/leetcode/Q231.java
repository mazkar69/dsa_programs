package leetcode;

public class Q231 {

        public static boolean isPowerOfTwo(int n) {

            if(n == 1 || n == 0){
                return n == 1;
            }

            if(n % 2 == 0){
                return isPowerOfTwo(n/2);
            }else{
                return false;
            }

        }

        public static void main(String []args){
            Boolean isPower = isPowerOfTwo(17);

            System.out.println(isPower);
        }
}
