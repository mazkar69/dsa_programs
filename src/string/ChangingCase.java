package string;

public class ChangingCase {

    public static String toUpperCase(String str1) {

        StringBuilder str = new StringBuilder(str1);
        //Length of string
        int n = str.length();

        for (int i = 0; i < n; i++) {
            int ascii = str.charAt(i);
            if (ascii >= 97 && ascii <= 122) {
                //Convert into upper case;
                ascii -= 32;
                str.setCharAt(i, (char) ascii);  // Replace in same position
            }
        }

        return new String(str);
    }

    public static String toLowerCase(String str1) {
        StringBuilder str = new StringBuilder(str1);
        int n = str.length();

        for (int i = 0; i < n; i++) {
            int ascii = str.charAt(i);

            if (ascii >= 65 && ascii <= 122) {
                ascii += 32;
                str.setCharAt(i, (char) ascii);
            }
        }

        return new String(str);
    }

    public static String toCapitalise(String str1) {
        StringBuilder str = new StringBuilder(str1);
        int n = str.length();
        boolean flag = true;

        for (int i = 0; i < n; i++) {
            char ch = str.charAt(i);

            if (flag && ch >= 'a' && ch <= 'z') {           //Char automatic convert into int i,e ascii. its called implicit convertion.
                str.setCharAt(i, (char) (ch - 32)); // convert to uppercase
                flag = false;
            } else if (ch != ' ') {
                flag = false;
            }

            if (ch == ' ') {
                flag = true;
            }
        }

        return str.toString();
    }

    public static void main(String[] args) {

        String str1 = "i love coding in Java";

        String updated = toCapitalise(str1);
        System.out.println(updated);
    }
}
