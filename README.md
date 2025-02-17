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
