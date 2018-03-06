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

## Development

Add TypeScript code to `index.ts`. Run
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
