import { factorial, taylorSin } from '../src/math';

describe('factorial unit tests', () => {
    test('should return 1 for 0 and 1', () => {
        expect(factorial(0)).toBe(1);
        expect(factorial(1)).toBe(1);
    });

    test('should correctly calculate factorials', () => {
        expect(factorial(2)).toBe(2);
        expect(factorial(3)).toBe(6);
        expect(factorial(4)).toBe(24);
        expect(factorial(5)).toBe(120);
        expect(factorial(12)).toBe(479001600);
    });
});

describe('taylorSin unit tests', () => {
    test('should correctly approximate sin(x) for small angles 0° < x < 360°', () => {
        expect(taylorSin(0)).toBe(0);
        expect(taylorSin(Math.PI / 2)).toBe(1);
        expect(taylorSin(-Math.PI / 2)).toBe(-1);
        expect(taylorSin(Math.PI)).toBeCloseTo(0, 5);
        expect(taylorSin(-Math.PI)).toBeCloseTo(0, 5);
        expect(taylorSin((3 * Math.PI) / 2)).toBeCloseTo(-1, 5);
        expect(taylorSin((-3 * Math.PI) / 2)).toBeCloseTo(1, 5);
    });

    test('sin(∞) should be NaN', () => {
        expect(taylorSin(Infinity)).toBeNaN();
    });

    test('sin(x) should be odd: sin(-x) = -sin(x)', () => {
        const x1 = 23.974,
            x2 = 1.345;
        expect(taylorSin(-x1)).toBeCloseTo(-taylorSin(x1), 5);
        expect(taylorSin(-x2)).toBeCloseTo(-taylorSin(x2), 5);
    });

    test('T = 2𝞹 periodicity', () => {
        // Using 20 terms for better accuracy of approximation
        expect(taylorSin(2 * Math.PI, 20)).toBeCloseTo(taylorSin(0, 20), 2);
        expect(taylorSin(2.5 * Math.PI, 20)).toBeCloseTo(
            taylorSin(0.5 * Math.PI, 20),
            1,
        );
        expect(taylorSin(3 * Math.PI, 20)).toBeCloseTo(taylorSin(Math.PI, 20), 1);
        expect(taylorSin(3.5 * Math.PI, 20)).toBeCloseTo(
            taylorSin(1.5 * Math.PI, 20),
            1,
        );
    });

    test('sin(x) increasing on [-𝞹/2; 𝞹/2]', () => {
        expect(taylorSin(-Math.PI / 2)).toBeLessThan(taylorSin(Math.PI / 2));
        expect(taylorSin(-0.3432)).toBeLessThan(taylorSin(0.7345));
    });
});
