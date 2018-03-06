# ind2sub

Convert a linear `index`, and an array of `sizes`, to an array of subscripts that index into a multi-dimensional array of size `sizes` in the Fortran (column-major) convention (first index varies fastest).

This is a JavaScript (TypeScript actually) library to mimic the behavior of the eponymous function in [Julia](https://docs.julialang.org/en/stable/stdlib/arrays/#Base.ind2sub) and [Matlab](https://www.mathworks.com/help/matlab/ref/ind2sub.html). Numpy calls this [`unravel_index`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.unravel_index.html), though it's fancier, since it can handle C-style (row-major) convention too.

## Install & usage

**Node.js** At the command line in your Node.js app, run the following:
```
$ npm add --save ind2sub
```
This will install this module in your app's `node_modules/` directory. Then in Node, you can use it:
```js
const ind2sub = require('ind2sub').ind2sub;
console.log(ind2sub([2, 3, 4], 0)) // prints [0, 0, 0]
console.log(ind2sub([2, 3, 4], 1)) // prints [1, 0, 0]
console.log(ind2sub([2, 3, 4], 2)) // prints [0, 1, 0]
console.log(ind2sub([2, 3, 4], 22)) // prints [0, 2, 3]
console.log(ind2sub([2, 3, 4], 23)) // prints [1, 2, 3]
```

If your project uses TypeScript also, you can use the following import statement:
```ts
import {ind2sub} from 'ind2sub';
console.log(ind2sub([2, 3, 4], 23)) // etc.
```

**Browser** If you want to load this as a global variable in the browser, download [`ind2sub-browser.js`](ind2sub-browser.js) and load it into your HTML with
```html
<script src="ind2sub-browser.js"></script>
```
Then any subsequently-loaded JavaScript code in your webapp can invoke this as
```js
ind2sub.ind2sub([2, 3, 4], 22); // `Array [ 0, 2, 3 ]` in Firefox
```

## API

### `ind2sub`
```js
// number[] -> number -> number[]
ind2sub(sizes, index)
```
Given some conceptual `N`-dimensional array with sizes `sizes` (an `N`-element array), and a linear `index` into that array (in Fortran, column-major, order), this returns another `N`-element array of subscripts needed to reach that index. Examples were given above.

### `optimizeInd2sub`
```js
// number[] -> (number -> number[])
optimizeInd2sub(sizes)
```
A higher-order function. Given just the `N`-element `sizes` array from above, this returns another function, which takes one `index` argument, that in turn yields the final `N`-element subscripts array. This function will cache an intermediate array that depends on `sizes`, to speed up repeated calls to `ind2sub` for the same array `sizes`.

Example, in Node.js:
```js
const { ind2sub, optimizeInd2sub } = require('ind2sub');
const sizes = [ 2, 3, 4 ];
const f = optimizeInd2sub(sizes);
console.log(ind2sub(sizes, 5), f(5)) // [ 1, 2, 0 ], [ 1, 2, 0 ]
console.log(ind2sub(sizes, 15), f(15)) // [ 1, 1, 2 ], [ 1, 1, 2 ]
console.log(ind2sub(sizes, 22), f(22)) // [ 0, 2, 3 ], [ 0, 2, 3 ]
```

A loop over large `sizes` that uses the optimized function might be 10x faster than the equivalent loop with plain `ind2sub` calls.

## Development

Add your TypeScript code to `index.ts`. Run
```
$ npm test
```
to make sure you didn't break anything. If you added new functionality, add a test in [`tests/`](tests/).

Run [clang-format](https://clang.llvm.org/docs/ClangFormat.html) to prettify the TypeScript:
```
$ clang-format -i index.ts tests/*js
```

To package it all up, run the following, which invokes `tsc`, the TypeScript compiler which spits out `index.js`, and Browserify, to prepare a browser-ready file in `ind2sub-browser.js`:
```
$ npm run build
```

## How it works

The mental image I have is a long linear chunk of memory: `0 1 2 3 4 5 6 7 8 9 10 11 …`.

Now.

If the first dimension, which varies the fastest in column-major/Fortran ordering, has size 2, then you can convince yourself pretty easily that the first subscript should be `linear index % 2`:

| 0 | 1 |
|---|---|
| 0 | 1 |
| 2 | 3 |
| 4 | 5 |
| ⋮ | ⋮ |

Say the second dimension has size 3. This means that the second subscript increments only after iterating through 2-tuples in the linear array: the second subscript is:

| 0   | 1   | 2   |
|-----|-----|-----|
| 0,1 | 2,3 | 4,5 |
| 6,7 | 8,9 | 10,11 |
| ⋮   | ⋮    | ⋮     |

So the second subscript should be `(linear index) / 2 % 3`. Note here how each table cell contains two values (for each slice of the first dimension) while each cell in the first table (for the first dimension) had only one element (the "zeroth" dimension?).

The third subscript increments after 2 * 3 elements of the linear array. Drawing the table above in your mind, you can see that the third subscript is `(linear index) / 6 % (size of third dimension)`.

Basically the formula in pseudocode is `ind2sub(size, linear index)[dimension] = (linear index) / PROD(size.slice(0, dimension)) % size[dimension]`, where `PROD([]) = 1` and `PROD(arr) = arr[0] * arr[1] * ...`.

That's basically the logic, encoded in two lines of TypeScript, that sits in the middle of this library.
