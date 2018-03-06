export function ind2sub(sizes: number[], index: number) {
  const cumprod = sizes.reduce((acc, n) => acc.concat(acc[acc.length - 1] * n), [ 1 ]);
  return sizes.map((size, i) => Math.floor(index / (cumprod[i])) % size);
}