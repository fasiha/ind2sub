export function ind2sub(sizes: number[], index: number) {
  const cumprod = sizes.reduce((acc, n) => acc.concat(acc[acc.length - 1] * n), [ 1 ]);
  return sizes.map((size, i) => Math.floor(index / (cumprod[i])) % size);
}

function ind2subNocheck(sizes: number[], index: number, cumprod: number[]) {
  return sizes.map((size, i) => Math.floor(index / (cumprod[i])) % size);
}

export function optimizeInd2sub(sizes: number[]): (index: number) => number[] {
  const cumprod = sizes.reduce((acc, n) => acc.concat(acc[acc.length - 1] * n), [ 1 ]);
  return index => ind2subNocheck(sizes, index, cumprod);
}
