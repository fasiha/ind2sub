"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ind2sub(sizes, index) {
    var cumprod = sizes.reduce(function (acc, n) { return acc.concat(acc[acc.length - 1] * n); }, [1]);
    return sizes.map(function (size, i) { return Math.floor(index / (cumprod[i])) % size; });
}
exports.ind2sub = ind2sub;
function ind2subNocheck(sizes, index, cumprod) {
    return sizes.map(function (size, i) { return Math.floor(index / (cumprod[i])) % size; });
}
function optimizeInd2sub(sizes) {
    var cumprod = sizes.reduce(function (acc, n) { return acc.concat(acc[acc.length - 1] * n); }, [1]);
    return function (index) { return ind2subNocheck(sizes, index, cumprod); };
}
exports.optimizeInd2sub = optimizeInd2sub;
