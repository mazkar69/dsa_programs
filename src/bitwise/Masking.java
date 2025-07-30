package bitwise;


public class Masking {
    public static void main(String[] args) {
        int a = 8; //1000

        int mask = 1 << 2;    //00100
//===========================================================
        //Check if a bit is on and off
        if ((a & mask) != 0) {
            System.out.println("Bit is true");
        } else {
            System.out.println("Bit is false");
        }
//===========================================================

        //Turn on the 3rd bit of 8 and make it 12.
        mask = 1 << 2;
        a = mask | a;
        System.out.println("After make a bit on value of a is " + a);

//===========================================================

        //Clear a range of bit
        int n = 15;    //1111
        int i = 2;   //Means last 2 bit clear
        //Clear last 2 bit and make it 1100 that is 12;

        int mask2 = 0; //all the bits are zero
        mask2 = ~mask2 << i;
        System.out.println("Before clearing the bits number is " + n);

        n = n & mask2;
        System.out.println("After clear the bits number is " + n);

    }
}
