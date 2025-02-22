<p align="center">
  <a href="https://github.com/worthant/taylor-tan-visualization/">
    <picture>
      <img src="https://github.com/user-attachments/assets/7fd9cef6-c848-446b-ba65-629ba5bec678" height="200">
    </picture>
<h1 align="center">
  Taylor series approximating tan(x) visualization
</h1>
  </a>
</p>

<p align="center">  
 <a aria-label="Node.js Version" href="https://nodejs.org/">
  <img alt="Node.js Version" src="https://img.shields.io/badge/Node.js-20.12.2-brightgreen?style=for-the-badge&logo=node.js&labelColor=000000">
</a>
<a aria-label="ts-jest" href="https://kulshekhar.github.io/ts-jest/">
  <img alt="ts-jest" src="https://img.shields.io/badge/ts--jest-29.2.5-red?style=for-the-badge&logo=jest&labelColor=000000">
</a>
<a aria-label="vite" href="https://vitejs.dev/">
  <img alt="vite" src="https://img.shields.io/badge/Vite-6.1.0-purple?style=for-the-badge&logo=vite&labelColor=000000">
</a>
  <a aria-label="Coverage Status" href="https://coveralls.io/github/worthant/taylor-tan-visualization?branch=main">
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/worthant/taylor-tan-visualization/main?style=for-the-badge&labelColor=000000&logo=coveralls&color=green">
  </a>
</p>

|![2025-02-22 03-20-54](https://github.com/user-attachments/assets/cfb6b2de-891b-4258-b29e-b58a7f0776af)|
|-|

## Maths behind this repo

**Taylor series** of any real or complex-valued function f(x), that is
infinitely differentiable at a real or complex number a, looks like this:

$$
f(x) = f(a) + f'(a) \cdot (x-a) + \frac{f''(a)}{2!} \cdot (x-a)^2 +
$$

$$
,+ \frac{f^{(3)}}{3!} \cdot (x-a)^3 + \dots + \sum_{n=0}^\infty \frac{f^{(n)} (a)}{n!} (x - a)^n
$$

I want to visualize $tan(x)$ - it's basically a $\frac{sin(x)}{cos(x)}$. To
approximate those functions we can just use Taylor series at $a=0$, which is
called **Maclaurin series**:

$$
sin(x) = sin(0) + sin'(0) \cdot (x - 0) + \frac{sin''(0)}{2!} \cdot (x - 0)^2 + \dots
$$

$$
sin(x) = sin(0) + cos(0) \cdot x + \frac{-sin(0)}{2!} \cdot x^2 + \dots
$$

$$
sin(x) = 0 + 1 \cdot x + 0 - 1 \cdot \frac{x^3}{3!} + 0 + \dots
$$

$$
sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \dots
$$

Performing same operations for cos(x):

$$
\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \dots
$$

Now, as i said above, $tan(x)$ function can be simply calculated from those
approximations of $cos(x)$ and $sin(x)$ by deviding them:

$$
tan(x) = \frac{sin(x)}{cos(x)} = \frac{x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \dots}{1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \dots}
$$

Also, the sin(x) and cos(x) approximation formulas can be summarized as this:

$$
sin(x) = \sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!}
$$

$$
cos(x) = \sum_{n=0}^\infty \frac{(-1)^n x^{2n}}{(2n)!}
$$

This repo visualizes this approximation of tan(x) and shows how adding more
terms improves the accuracy, using those formulas for $sin(x)$ and $cos(x)$.
