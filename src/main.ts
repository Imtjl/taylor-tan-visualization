import p5 from 'p5';
import { taylorCos, taylorSin, taylorTan } from './math';
import { dashedCircle, dashedLine, initUtils } from './p5-utils';

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const CIRCLE_RADIUS = 100;
const GRAPH_AMPLITUDE = 50;
const GRAPH_PERIOD = 300;
const OX = WIDTH / 4;
const OY = HEIGHT / 2;

// p5.js sketch
const sketch = (p: p5) => {
	let deg: number = 0;

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.angleMode(p.DEGREES);
		initUtils(p);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	};

	p.draw = () => {
		p.background(0);

		deg = (p.frameCount % 1440) / 4;
		drawUnitCircle(deg);
		drawGraphs(deg);

		drawTexts();
	};

	const drawTexts = () => {
		p.fill(255);
		p.textSize(24);
		p.textAlign(p.CENTER, p.TOP);
		p.text(`angle: ${deg.toFixed(0)}°`, WIDTH / 2, 10);
	};

	const drawUnitCircle = (deg: number) => {
		p.noFill();
		p.stroke(128);
		p.strokeWeight(2);
		dashedCircle(OX, OY, 2 * CIRCLE_RADIUS);

		// Draw diameters
		p.line(OX, OY - CIRCLE_RADIUS, OX, OY + CIRCLE_RADIUS);
		p.line(OX - CIRCLE_RADIUS, OY, OX + CIRCLE_RADIUS, OY);

		// Draw moving points
		drawUnitCircleMovingPoints(deg);
	};

	const drawUnitCircleMovingPoints = (deg: number) => {
		const rad = p.radians(deg);
		const pointX = OX + CIRCLE_RADIUS * taylorCos(rad);
		const pointY = OY - CIRCLE_RADIUS * taylorSin(rad);

		// Draw line from center to point
		p.stroke(128);
		p.strokeWeight(2);
		p.line(OX, OY, pointX, pointY);

		// Draw dashed line from point to tan(x) line
		p.strokeWeight(1);
		dashedLine(
			pointX,
			pointY,
			OX + CIRCLE_RADIUS + 20,
			OY - (CIRCLE_RADIUS + 20) * taylorTan(rad),
		);

		// angle moving point
		p.noStroke();
		p.fill('white');
		p.circle(pointX, pointY, 10);

		// cos(x) moving point
		p.fill('#6fa');
		p.circle(pointX, OY, 10);

		// sin(x) moving point
		p.fill('#fae');
		p.circle(OX, pointY, 10);

		// tan(x) moving point
		const tanPointX = OX + CIRCLE_RADIUS;
		const tanPointY = OY - CIRCLE_RADIUS * taylorTan(rad);
		p.colorMode(p.HSB, 100);
		p.fill(p.color(50, 55, 100));
		p.circle(tanPointX, tanPointY, 10);

		// tan(x) axis
		p.stroke(128);
		p.strokeWeight(1);
		dashedLine(tanPointX, OY - CIRCLE_RADIUS, tanPointX, OY + CIRCLE_RADIUS);

		// dahed 90 deg angle
		p.stroke(255);
		dashedLine(OX + CIRCLE_RADIUS - 15, OY - 15, OX + CIRCLE_RADIUS, OY - 15);
		dashedLine(OX + CIRCLE_RADIUS - 15, OY, OX + CIRCLE_RADIUS - 15, OY - 15);

		// Make tan axis extend after reaching |y=1|
		if (tanPointY <= OY - CIRCLE_RADIUS + 15) {
			dashedLine(
				tanPointX,
				OY - CIRCLE_RADIUS,
				tanPointX,
				tanPointY - 20 * taylorTan(rad),
			);
		} else if (tanPointY >= OY + CIRCLE_RADIUS - 15) {
			dashedLine(
				tanPointX,
				OY + CIRCLE_RADIUS,
				tanPointX,
				tanPointY - 20 * taylorTan(rad),
			);
		}
	};

	const drawGraphs = (deg: number) => {
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
		const lineX = p.map(deg, 0, 360, graphX, graphX + GRAPH_PERIOD);
		p.stroke(128);
		p.line(lineX, graphY - GRAPH_AMPLITUDE, lineX, graphY + GRAPH_AMPLITUDE);

		const rad = p.radians(deg);

		const cosY = graphY - GRAPH_AMPLITUDE * taylorCos(rad);
		const sinY = graphY - GRAPH_AMPLITUDE * taylorSin(rad);
		let tanY = graphY - GRAPH_AMPLITUDE * taylorTan(rad);

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

		// y-range for the tan(x) graph
		const yMin = -5;
		const yMax = 5;

		// asymptotes at x = -π/2 and x = π/2
		const as1X = startX + GRAPH_PERIOD / 4;
		const as2X = startX + (GRAPH_PERIOD * 3) / 4;

		p.stroke(128);
		p.strokeWeight(1);
		dashedLine(
			as1X,
			startY + yMin * GRAPH_AMPLITUDE + 15,
			as1X,
			startY + yMax * (GRAPH_AMPLITUDE - 2),
		);
		dashedLine(
			as2X,
			startY + yMin * GRAPH_AMPLITUDE + 15,
			as2X,
			startY + yMax * GRAPH_AMPLITUDE - 10,
		);

		// tan(x)
		p.stroke(p.color(50, 55, 100)); // bright blue
		p.beginShape();
		for (let t = 0; t <= 360; t++) {
			const rad = p.radians(t);
			const x = p.map(t, 0, 360, startX, startX + GRAPH_PERIOD);

			// Skip drawing near asymptotes
			if (
				Math.abs(rad + Math.PI / 2) < 1e-3 ||
				Math.abs(rad - Math.PI / 2) < 1e-3
			) {
				p.endShape();
				p.beginShape();
				continue;
			}

			const y = startY - GRAPH_AMPLITUDE * taylorTan(rad);

			// Clip the y-values to the defined range
			if (
				y >= startY + yMin * GRAPH_AMPLITUDE &&
				y <= startY + yMax * GRAPH_AMPLITUDE
			) {
				p.vertex(x, y);
			} else {
				p.endShape();
				p.beginShape();
			}
		}
		p.endShape();
	};
};

new p5(sketch);
