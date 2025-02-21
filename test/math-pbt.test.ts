import * as fc from 'fast-check';
import { taylorSin } from '../src/math';

describe('taylorSin pbt tests', () => {
    test('odd property: sin(-x) = -sin(x)', () => {
        fc.assert(
            fc.property(
                fc.double({ min: -50, max: 50 }).filter((x) => !Number.isNaN(x)),
                (x) => {
                    expect(taylorSin(-x, 15)).toBeCloseTo(-taylorSin(x, 15), 2);
                },
            ),
        );
    });

    test('periodicity property: sin(x + 2π) = sin(x) in [-5π, 5π]', () => {
        fc.assert(
            fc.property(
                fc
                    .double({ min: -5 * Math.PI, max: 5 * Math.PI })
                    .filter((x) => !Number.isNaN(x)),
                (x) => {
                    // Big arguments <=> a lot of terms for good accuracy
                    expect(taylorSin(x + 2 * Math.PI, 40)).toBeCloseTo(
                        taylorSin(x, 40),
                        2,
                    );
                },
            ),
        );
    });

    test('range property: sin(x) range is [-1, 1]', () => {
        fc.assert(
            fc.property(
                fc
                    .double({ min: -Math.PI, max: Math.PI })
                    .filter((x) => !Number.isNaN(x)),
                (x) => {
                    const s = taylorSin(x, 20);
                    expect(s).toBeLessThanOrEqual(1);
                    expect(s).toBeGreaterThanOrEqual(-1);
                },
            ),
        );
    });

    test('monotonicity property: sin(x) ascends within each [-π/2 + 2kπ, π/2 + 2kπ]', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: -10, max: 10 }).filter((x) => !Number.isNaN(x)),
                fc
                    .double({ min: -Math.PI / 2, max: Math.PI / 2 })
                    .filter((x) => !Number.isNaN(x)),
                fc
                    .double({ min: -Math.PI / 2, max: Math.PI / 2 })
                    .filter((x) => !Number.isNaN(x)),
                (k, xOffset, yOffset) => {
                    const x = 2 * k * Math.PI + xOffset;
                    const y = 2 * k * Math.PI + yOffset;

                    if (x < y) {
                        const sx = taylorSin(x, 25);
                        const sy = taylorSin(y, 25);
                        const diff = sy - sx;
                        if (Math.abs(diff) > 1e-3) {
                            expect(sx).toBeLessThan(sy);
                        }
                    }
                },
            ),
        );
    });
});
