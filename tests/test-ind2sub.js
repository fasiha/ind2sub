const test = require('tape');
const ind2sub = require('../index');

const prod = arr => arr.reduce((acc, n) => acc * n, 1);
const sum = arr => arr.reduce((acc, n) => acc + n, 0);

test('ind2sub works', (t) => {
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