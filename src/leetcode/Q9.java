package leetcode;

//Palindrome Number
public class Q9 {
    public static boolean isPalindrome(int x) {

        if(x <0){
            return false;
        }

        int reverse = 0;
        int num = x;

        while(num!=0){

            reverse = (reverse*10) + (num%10);
            num = num/10;
        }

        return reverse == x;
    }

    public static void main(String []srt){
        boolean isValid = isPalindrome(121);
        System.out.println(isValid);
    }
}
