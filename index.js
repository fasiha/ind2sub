"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ind2sub(sizes, index) {
    var cumprod = sizes.reduce(function (acc, n) { return acc.concat(acc[acc.length - 1] * n); }, [1]);
    return sizes.map(function (size, i) { return Math.floor(index / (cumprod[i])) % size; });
}
exports.ind2sub = ind2sub;
