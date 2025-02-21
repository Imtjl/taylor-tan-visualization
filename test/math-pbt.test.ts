import * as fc from 'fast-check';
import { taylorCos, taylorSin, taylorTan } from '../src/math';

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
                        expect(sx).toBeLessThan(sy + 1e-3);
                    }
                },
            ),
        );
    });
});

describe('taylorCos pbt tests', () => {
    test('even property: cos(-x) = cos(x)', () => {
        fc.assert(
            fc.property(
                fc.double({ min: -100, max: 100 }).filter((x) => !Number.isNaN(x)),
                (x) => {
                    expect(taylorCos(-x, 15)).toBeCloseTo(taylorCos(x, 15), 3);
                },
            ),
        );
    });

    test('range property: cos(x) range is [-1, 1]', () => {
        fc.assert(
            fc.property(
                fc
                    .double({ min: -Math.PI, max: Math.PI })
                    .filter((x) => !Number.isNaN(x)),
                (x) => {
                    const c = taylorCos(x, 20);
                    expect(c).toBeLessThanOrEqual(1 + 1e-10);
                    expect(c).toBeGreaterThanOrEqual(-1 - 1e-10);
                },
            ),
        );
    });

    test('monotonicity property: cos(x) is strictly decreasing on [0, π]', () => {
        fc.assert(
            fc.property(
                fc.double({ min: 0, max: Math.PI }).filter((x) => !Number.isNaN(x)),
                fc.double({ min: 0, max: Math.PI }).filter((x) => !Number.isNaN(x)),
                (x, y) => {
                    if (x < y) {
                        const cx = taylorCos(x, 20);
                        const cy = taylorCos(y, 20);
                        expect(cx + 1e-8).toBeGreaterThan(cy);
                    }
                },
            ),
        );
    });
});

describe('taylorTan pbt tests', () => {
    test('monotonicity property: tan(x) ascends within each (-π/2 + π*k, π/2 + π*k)', () => {
        // cos shouldn't be close to zero, for example x ∈ [-π/2+0.1, π/2-0.1]
        fc.assert(
            fc.property(
                fc.integer({ min: -10, max: 10 }),
                fc
                    .double({ min: -Math.PI / 2 + 0.1, max: Math.PI / 2 - 0.1 })
                    .filter((x) => !Number.isNaN(x)),
                fc
                    .double({ min: -Math.PI / 2 + 0.1, max: Math.PI / 2 - 0.1 })
                    .filter((x) => !Number.isNaN(x)),
                (k, xOffset, yOffset) => {
                    const x = Math.PI * k + xOffset;
                    const y = Math.PI * k + yOffset;
                    if (x < y) {
                        const tanX = taylorTan(x, 25);
                        const tanY = taylorTan(y, 25);
                        expect(tanX).toBeLessThan(tanY + 1e-1);
                    }
                },
            ),
        );
    });

    test('periodicity property: tan(x + π) = tan(x) for safe values', () => {
        // cos shouldn't be close to zero, for example x ∈ [-π/4, π/4]
        fc.assert(
            fc.property(
                fc
                    .double({ min: -Math.PI / 4, max: Math.PI / 4 })
                    .filter((x) => !Number.isNaN(x)),
                (x) => {
                    const t1 = taylorTan(x, 15);
                    const t2 = taylorTan(x + Math.PI, 15);
                    expect(Math.abs(t1 - t2)).toBeLessThan(0.1);
                },
            ),
        );
    });

    test('odd property: tan(-x) = -tan(x)', () => {
        fc.assert(
            fc.property(
                fc
                    .double({ min: -Math.PI / 4, max: Math.PI / 4 })
                    .filter((x) => !Number.isNaN(x)),
                (x) => {
                    expect(taylorTan(-x, 15)).toBeCloseTo(-taylorTan(x, 15), 3);
                },
            ),
        );
    });

    test('range property: when cos(x) is nearly zero, tan(x) returns NaN', () => {
        // when x = π/2 or 3π/2 => we get NaN
        expect(taylorTan(Math.PI / 2, 15)).toBeNaN();
        expect(taylorTan((3 * Math.PI) / 2, 15)).toBeNaN();
    });

    test('tan(Infinity) should be NaN', () => {
        expect(taylorTan(Infinity, 15)).toBeNaN();
    });
});
