import p5 from 'p5';

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const CIRCLE_RADIUS = 100;
const GRAPH_AMPLITUDE = 50;
const GRAPH_PERIOD = 300;

// Taylor series functions
function taylorSin(x: number, terms: number = 10): number {
	let result: number = 0;
	for (let n: number = 0; n < terms; n++) {
		const numerator: number = (-1) ** n * x ** (2 * n + 1);
		const denominator: number = factorial(2 * n + 1);
		result += numerator / denominator;
	}
	return result;
}

function taylorCos(x: number, terms: number = 10): number {
	let result: number = 0;
	for (let n: number = 0; n < terms; n++) {
		const numerator: number = (-1) ** n * x ** (2 * n);
		const denominator: number = factorial(2 * n);
		result += numerator / denominator;
	}
	return result;
}

function taylorTan(x: number, terms: number = 10): number {
	const cosX: number = taylorCos(x, terms);
	if (Math.abs(cosX) < 1e-10) {
		// throw new Error('tan(x) is undefined (cos(x) is close to 0).');
		return NaN;
	}
	const sinX: number = taylorSin(x, terms);
	return sinX / cosX;
}

function factorial(n: number): number {
	if (n === 0 || n === 1) return 1;
	let result: number = 1;
	for (let i: number = 2; i <= n; i++) {
		result *= i;
	}
	return result;
}

// p5.js sketch
const sketch = (p: p5) => {
	let angle: number = 0;

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.angleMode(p.DEGREES);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	};

	p.draw = () => {
		p.background(0);

		// Update angle
		angle = (p.frameCount % 1440) / 4;

		// Draw circle and moving point
		drawCircle();
		drawMovingPoint(angle);

		// Draw graphs
		drawGraphs(angle);

		drawTexts();
	};

	const drawTexts = () => {
		p.fill(255);
		p.textSize(24);
		p.textAlign(p.CENTER, p.TOP);
		p.text(`angle: ${angle.toFixed(0)}°`, WIDTH / 2, 10);
	};

	const drawCircle = () => {
		p.noFill();
		p.stroke(128);
		p.strokeWeight(2);
		p.circle(WIDTH / 4, HEIGHT / 2, 2 * CIRCLE_RADIUS);

		// Draw diameters
		p.line(
			WIDTH / 4,
			HEIGHT / 2 - CIRCLE_RADIUS,
			WIDTH / 4,
			HEIGHT / 2 + CIRCLE_RADIUS,
		);
		p.line(
			WIDTH / 4 - CIRCLE_RADIUS,
			HEIGHT / 2,
			WIDTH / 4 + CIRCLE_RADIUS,
			HEIGHT / 2,
		);
	};

	const drawMovingPoint = (angle: number) => {
		let rad = p.radians(angle);
		const pointX = WIDTH / 4 + CIRCLE_RADIUS * taylorCos(rad);
		const pointY = HEIGHT / 2 - CIRCLE_RADIUS * taylorSin(rad);

		// Draw line from center to point
		p.stroke(128);
		p.strokeWeight(2);
		p.line(WIDTH / 4, HEIGHT / 2, pointX, pointY);

		// Draw dashed line from point to tan(x) line
		p.strokeWeight(1);
		dashedLine(
			pointX,
			pointY,
			WIDTH / 4 + CIRCLE_RADIUS + 20,
			HEIGHT / 2 - (CIRCLE_RADIUS + 20) * taylorTan(rad),
		);

		// Draw points
		p.noStroke();
		p.fill('white');
		p.circle(pointX, pointY, 10);

		p.fill('#6fa');
		p.circle(pointX, HEIGHT / 2, 10);

		p.fill('#fae');
		p.circle(WIDTH / 4, pointY, 10);

		const tanPointX = WIDTH / 4 + CIRCLE_RADIUS;
		const tanPointY = HEIGHT / 2 - CIRCLE_RADIUS * taylorTan(rad);
		p.colorMode(p.HSB, 100);
		p.fill(p.color(50, 55, 100));
		p.circle(tanPointX, tanPointY, 10);

		// Draw dashed tan(x) axis
		p.stroke(128);
		p.strokeWeight(1);
		dashedLine(
			tanPointX,
			HEIGHT / 2 - CIRCLE_RADIUS,
			tanPointX,
			HEIGHT / 2 + CIRCLE_RADIUS,
		);

		p.stroke(255);
		dashedLine(
			WIDTH / 4 + CIRCLE_RADIUS - 15,
			HEIGHT / 2 - 15,
			WIDTH / 4 + CIRCLE_RADIUS,
			HEIGHT / 2 - 15,
		);
		dashedLine(
			WIDTH / 4 + CIRCLE_RADIUS - 15,
			HEIGHT / 2,
			WIDTH / 4 + CIRCLE_RADIUS - 15,
			HEIGHT / 2 - 15,
		);

		// TODO: make tan axis extend after reaching |y=1|
	};

	const drawGraphs = (angle: number) => {
		const graphX = WIDTH / 2;
		const graphY = HEIGHT / 2;

		// Draw axes
		p.stroke(128);
		p.strokeWeight(1);
		p.line(graphX, graphY - GRAPH_AMPLITUDE, graphX, graphY + GRAPH_AMPLITUDE);
		p.line(graphX, graphY, graphX + GRAPH_PERIOD, graphY);

		// Draw sine and cosine curves
		drawSineCurve(graphX, graphY);
		drawCosineCurve(graphX, graphY);
		drawTanCurve(graphX, graphY);

		// Draw moving line and points
		const lineX = p.map(angle, 0, 360, graphX, graphX + GRAPH_PERIOD);
		p.stroke(128);
		p.line(lineX, graphY - GRAPH_AMPLITUDE, lineX, graphY + GRAPH_AMPLITUDE);

		const rad = p.radians(angle);

		const cosY = graphY - GRAPH_AMPLITUDE * taylorCos(rad);
		const sinY = graphY - GRAPH_AMPLITUDE * taylorSin(rad);
		const tanY = graphY - GRAPH_AMPLITUDE * taylorTan(rad);

		// sin(x) - Pink
		p.noStroke();
		p.fill('#fae');
		p.circle(lineX, sinY, 10);

		// cos(x) - Muted Green
		p.fill('#6fa');
		p.circle(lineX, cosY, 10);

		// tan(x) - Bright Blue
		p.colorMode(p.HSB, 100);
		p.fill(p.color(50, 55, 100)); // Or use HEX: p.fill('#0af');
		p.circle(lineX, tanY, 10);
	};

	const drawSineCurve = (startX: number, startY: number) => {
		p.noFill();
		p.stroke('#fae');
		p.beginShape();
		for (let t = 0; t <= 360; t++) {
			const rad = p.radians(t);
			const x = p.map(rad, 0, 360, startX, startX + GRAPH_PERIOD + 17000);
			const y = startY - GRAPH_AMPLITUDE * taylorSin(rad);
			p.vertex(x, y);
		}
		p.endShape();
	};

	const drawCosineCurve = (startX: number, startY: number) => {
		p.noFill();
		p.stroke('#6fa');
		p.beginShape();
		for (let t = 0; t <= 360; t++) {
			const rad = p.radians(t);
			const x = p.map(t, 0, 360, startX, startX + GRAPH_PERIOD);
			const y = startY - GRAPH_AMPLITUDE * taylorCos(rad);
			p.vertex(x, y);
		}
		p.endShape();
	};

	const drawTanCurve = (startX: number, startY: number) => {
		p.noFill();
		p.colorMode(p.HSB, 100);
		p.stroke(p.color(50, 55, 100));
		p.beginShape();
		for (let t = 0; t <= 360; t++) {
			const rad = p.radians(t);
			const x = p.map(t, 0, 360, startX, startX + GRAPH_PERIOD);
			const y = startY - GRAPH_AMPLITUDE * taylorTan(rad);
			p.vertex(x, y);
		}
		p.endShape();
	};

	const dashedLine = (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		dashLength = 5,
		gapLength = 5,
	) => {
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
	};
};

new p5(sketch);
