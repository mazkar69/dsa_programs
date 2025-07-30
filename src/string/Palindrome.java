package string;

//Original String === Reverse String.
public class Palindrome {

    public static void main(String []args){
        String str = "madam";
        int length = str.length();
        boolean flag = true;

        for(int i = 0; i < length/2; i++){
            if(str.charAt(i) != str.charAt((length-1)-i)){
                flag = false;
            }
        }

        System.out.println(flag ? "Palindrome" : "Not Palindrome");
    }
}
