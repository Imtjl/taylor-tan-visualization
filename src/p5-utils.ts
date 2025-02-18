import p5 from 'p5';

let p: p5;

/**
 * Inits this module with the p5 instance.
 * @param p5Instance - The p5.js instance.
 */
export function initUtils(p5Instance: p5) {
    p = p5Instance;
}

/**
 * Draws a dashed line between two points.
 * @param p - The p5 instance.
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @param dashLength - The length of each dash (default: 5).
 * @param gapLength - The length of each gap (default: 5).
 */
export function dashedLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dashLength = 5,
    gapLength = 5,
) {
    let distance = p.dist(x1, y1, x2, y2);
    let dashCount = distance / (dashLength + gapLength);

    for (let i = 0; i < dashCount; i++) {
        let t = i / dashCount;
        let xStart = p.lerp(x1, x2, t);
        let yStart = p.lerp(y1, y2, t);
        let xEnd = p.lerp(x1, x2, t + dashLength / distance);
        let yEnd = p.lerp(y1, y2, t + dashLength / distance);
        p.line(xStart, yStart, xEnd, yEnd);
    }
}

/**
 * Draws a dashed circle.
 * @param x - The x-coordinate of the circle's center.
 * @param y - The y-coordinate of the circle's center.
 * @param d - The diameter of the circle.
 * @param dashLength - The length of each dash (default: 5).
 * @param gapLength - The length of each gap (default: 5).
 */
export function dashedCircle(
    x: number,
    y: number,
    d: number,
    dashLength = 8,
    gapLength = 5,
) {
    const circumference = Math.PI * d;
    const dashCount = circumference / (dashLength + gapLength);
    const angleStep = 360 / dashCount;

    for (let i = 0; i < dashCount; i++) {
        const startAngle = i * angleStep;
        const dashAngle = dashLength / (d / 60);
        const endAngle = startAngle + dashAngle;
        p.arc(x, y, d, d, startAngle, endAngle);
    }
}
