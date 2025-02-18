/**
 * Computes the factorial of a number.
 * @param n - The input number.
 * @returns The factorial of n.
 */
export function factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result: number = 1;
    for (let i: number = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Approximates sin(x) using a Taylor series.
 * @param x - The input value (in radians).
 * @param terms - The number of terms to use in the approximation (default: 10).
 * @returns The approximated value of sin(x).
 */
export function taylorSin(x: number, terms: number = 10): number {
    let result: number = 0;
    for (let n: number = 0; n < terms; n++) {
        const numerator: number = (-1) ** n * x ** (2 * n + 1);
        const denominator: number = factorial(2 * n + 1);
        result += numerator / denominator;
    }
    return result;
}

/**
 * Approximates cos(x) using a Taylor series.
 * @param x - The input value (in radians).
 * @param terms - The number of terms to use in the approximation (default: 10).
 * @returns The approximated value of cos(x).
 */
export function taylorCos(x: number, terms: number = 10): number {
    let result: number = 0;
    for (let n: number = 0; n < terms; n++) {
        const numerator: number = (-1) ** n * x ** (2 * n);
        const denominator: number = factorial(2 * n);
        result += numerator / denominator;
    }
    return result;
}

/**
 * Approximates tan(x) using Taylor series approximations for sin(x) and cos(x).
 * @param x - The input value (in radians).
 * @param terms - The number of terms to use in the approximation (default: 10).
 * @returns The approximated value of tan(x), or NaN if cos(x) is close to 0.
 */
export function taylorTan(x: number, terms: number = 10): number {
    const cosX: number = taylorCos(x, terms);
    if (Math.abs(cosX) < 1e-3) {
        return NaN; // Handle division by zero
    }
    const sinX: number = taylorSin(x, terms);
    return sinX / cosX;
}
