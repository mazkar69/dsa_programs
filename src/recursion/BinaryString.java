package recursion;

import static java.lang.System.exit;

//Print all binary strings of size n without consecutive ones.
public class BinaryString {

    private static int max=0;

    private static void printString(String str,int n){

        if(n==0){
            return;
        }
        if(str.charAt(n-1) == '0'){
            max = 0;
        }else{
            max += 1;
        }

        if(max >1){
            exit(0);
            return;
        }

        printString(str,n-1);
        System.out.print(str.charAt(n-1));


    }

    private static void printBinString(int n, int lastElement, String str){
        if(n == 0){
            System.out.println(str);
            return;
        }

        printBinString(n-1,0,str+"0");

        if(lastElement == 0){
            printBinString(n-1, 1, str + "1");
        }
    }


    public static void main(String []args){

//        String str = "01101001";
        String str = "010101";

//        printString(str,str.length());

        printBinString(3,0,"");
    }
}
