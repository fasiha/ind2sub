const test = require('tape');
const ind2sub = require('../index').ind2sub;

const prod = arr => arr.reduce((acc, n) => acc * n, 1);
const sum = arr => arr.reduce((acc, n) => acc + n, 0);

test('ind2sub works', t => {
  const sizes = [ 2, 3, 4 ];
  const totalElements = prod(sizes);

  for (let i = 0; i < totalElements; i++) {
    let subscripts = ind2sub(sizes, i);

    // Here's `sub2ind` in a nutshell:
    // `linearIndexFromSubscripts = subscripts[0] + subscripts[1] * sizes[1] + subscripts[2] * sizes[1] * sizes[2]`
    let linearIndexFromSubscripts = sum(subscripts.map((sub, subi) => sub * prod(sizes.slice(0, subi))));

    t.equal(i, linearIndexFromSubscripts);
  }
  t.end();
});

// Via https://docs.scipy.org/doc/numpy/reference/generated/numpy.unravel_index.html
// >>> np.unravel_index([31, 41, 13], (7,6), order='F')
// (array([3, 6, 6]), array([4, 5, 1]))
test('using numpy.unravel_index example', t => {
  t.deepEqual([ 3, 4 ], ind2sub([ 7, 6 ], 31));
  t.deepEqual([ 6, 5 ], ind2sub([ 7, 6 ], 41));
  t.deepEqual([ 6, 1 ], ind2sub([ 7, 6 ], 13));
  t.end();
})
