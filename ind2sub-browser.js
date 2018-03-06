(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ind2sub = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});