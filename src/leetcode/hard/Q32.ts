function longestValidParentheses(s: string): number {
    const stack: number[] = [];
    stack.push(-1);
    let max = 0;
    const isEmpty = () => stack.length === 0;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === "(") {
            stack.push(i);
        } else if (char === ")") {
            if (isEmpty()) {
                stack.push(i);
            } else {
                stack.pop();
                if (isEmpty()) {
                    stack.push(i);
                }
                const lastIndex = stack[stack.length - 1];
                max = Math.max(max, i - lastIndex);
            }
        }
    }
    return max;
}

// Example usage:
console.log(longestValidParentheses("(()")); // Output: 2
console.log(longestValidParentheses(")()())")); // Output: 4
console.log(longestValidParentheses("")); // Output: 0
