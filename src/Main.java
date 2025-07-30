import java.util.Scanner;
import queue.Demo;
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        // Print a welcome message
        Demo demo = new Demo();

        // Create a Scanner object to read user input
        Scanner scanner = new Scanner(System.in);

        // Prompt user to enter first number
        System.out.println("Enter first number: ");
        double num1 = scanner.nextDouble();

        // Prompt user to enter second number
        System.out.println("Enter second number: ");
        double num2 = scanner.nextDouble();

        // Calculate sum
        double sum = num1 + num2;

        // Display the result
        System.out.println("Sum of " + num1 + " and " + num2 + " is: " + sum);

        // Close the scanner
        scanner.close();
    }
}