import promptSync from "prompt-sync";

const prompt = promptSync();

/**
 * Prints values on the same line without a newline at the end.
 * Usage: print(1, 2, 3)  →  "1 2 3"
 */
export function print(...values: unknown[]): void {
    process.stdout.write(values.join(" "));
}

/**
 * Prints values on the same line and moves to the next line.
 * Usage: println(1, 2, 3)  →  "1 2 3\n"
 */
export function println(...values: unknown[]): void {
    process.stdout.write(values.join(" ") + "\n");
}

/**
 * Reads a line of input from the console.
 * @param message - Optional prompt message to display.
 * @returns The input string.
 */
export function readLine(message: string = ""): string {
    return prompt(message) ?? "";
}

/**
 * Reads an integer from the console.
 * @param message - Optional prompt message to display.
 * @returns The parsed integer.
 */
export function readInt(message: string = ""): number {
    return parseInt(prompt(message) ?? "0", 10);
}

/**
 * Reads a float from the console.
 * @param message - Optional prompt message to display.
 * @returns The parsed float.
 */
export function readFloat(message: string = ""): number {
    return parseFloat(prompt(message) ?? "0");
}

/**
 * Reads a space-separated line and returns an array of integers.
 * @param message - Optional prompt message to display.
 * @returns Array of integers.
 */
export function readIntArray(message: string = ""): number[] {
    return (prompt(message) ?? "").trim().split(/\s+/).map(Number);
}
