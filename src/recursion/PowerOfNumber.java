package recursion;

public class PowerOfNumber {

    private static int calculatePower(int number,int power){

        if(power==0){
            return 1;
        }
        else{
            return  number *= calculatePower(number,power-1);
        }
    }

    public static void main(String []args){
        int totalPower = calculatePower(2,4);
        System.out.println("Total power is: " + totalPower);
    }
}
