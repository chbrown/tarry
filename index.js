//// export module arrays {
/**
Push each item in `items` onto the end of `array`.

Uses `Array#push`.
*/
function pushAll(array, items) {
    return Array.prototype.push.apply(array, items);
}
exports.pushAll = pushAll;
/**
Concatenate each array in `arrays`, returning a single array.

Uses `Array#concat`.
*/
function flatten(arrays) {
    // TODO: disallow mixing of arrays and non-arrays? (concat don't care)
    return Array.prototype.concat.apply([], arrays);
}
exports.flatten = flatten;
/**
Call `fn` with each item in `items`, and flatten the results into a single array.

`fn` should always return an Array.

Uses `Array#map` and `Array#concat`.
*/
function flatMap(items, fn, thisArg) {
    var arrays = items.map(fn, thisArg);
    return Array.prototype.concat.apply([], arrays);
}
exports.flatMap = flatMap;
/**
Take anything that can be indexed by number (`iterable`) and return a new Array
of elements of that type.

Useful for things such as NodeList objects returned from DOM calls like
`document.querySelectorAll(...)`.

Uses a `for(;;)` loop.
*/
function toArray(iterable) {
    var array = new Array(iterable.length);
    for (var i = 0, item; (item = iterable[i]) !== undefined; i++) {
        array.push(item);
    }
    return array;
}
exports.toArray = toArray;
/**
Sum all items in `xs`

Equivalent to `return xs.reduce((a, b) => a + b, 0)`
*/
function sum(xs) {
    var total = 0;
    for (var i = 0, l = xs.length; i < l; i++) {
        total += xs[i];
    }
    return total;
}
exports.sum = sum;
/**
Return the mean of an array of numbers by calling `sum(xs)` and dividing by the
length. No special accomodation is made for non-numeric items in `xs`.

Returns `NaN` if `xs` is empty.

Uses `arrays.sum`.
*/
function mean(xs) {
    return sum(xs) / xs.length;
}
exports.mean = mean;
/**
Find the median of all items in `xs`, taking the mean of the central two values
if `xs` has an even number of items.

Returns `undefined` if `xs` is empty.

Does not manipulate `xs`.

Uses `Array#slice(0)` and `Array#sort`.
*/
function median(xs) {
    var sorted_xs = xs.slice(0).sort();
    var middle = sorted_xs.length / 2;
    // if xs is even, average the two middle items
    if (sorted_xs.length % 2 === 0) {
        return (sorted_xs[middle - 1] + sorted_xs[middle]) / 2.0;
    }
    return sorted_xs[middle - 0.5];
}
exports.median = median;
/**
Returns an array of numbers that is (q + 1)-long (it includes the endpoints),
representing the entries at each of the requested quantiles.
*/
function quantile(xs, q, sort) {
    if (sort === void 0) { sort = true; }
    var length = xs.length;
    var step = length / q;
    var quantile = [];
    if (sort) {
        xs = xs.sort(function (a, b) { return a - b; });
    }
    for (var sample = 0; sample < length; sample += step) {
        quantile.push(xs[sample | 0]);
    }
    quantile.push(xs[length - 1]);
    return quantile;
}
exports.quantile = quantile;
/**
Find the minimum value in `xs`.

Returns `Infinity` if `xs` is empty.

Uses `Math.min`.
*/
function min(xs) {
    return Math.min.apply(null, xs);
}
exports.min = min;
/**
Find the maximum value in `xs`.

Returns `-Infinity` if `xs` is empty.

Uses `Math.max`.
*/
function max(xs) {
    return Math.max.apply(null, xs);
}
exports.max = max;
/**
Generate a new Array of all values between `0` and `max`, excluding `max`,
incrementing by `step`, which defaults to `1`.

Examples:

    range(5) => [0, 1, 2, 3, 4]
    range(0) => []
    range(10, 5) => [0, 5]
    range(11, 5) => [0, 5, 10]

Uses a `for(;;)` loop.
*/
function range(max, step) {
    if (step === void 0) { step = 1; }
    var length = Math.ceil(max / step);
    var indices = new Array(length);
    for (var i = 0; i < length; i++) {
        indices[i] = i * step;
    }
    return indices;
}
exports.range = range;
/**
Group the entries of the `items` into a new Array, which contains sub-Arrays
of at most `size` items. If `items` is not a multiple of `size`, the last array
will have fewer than `size` items (but more than `0`).

A `size` of `0` will trigger an infinite loop.

Examples:

    groups([1, 2, 3, 4, 5], 1) => [[1], [2], [3], [4], [5]]
    groups([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
    groups([1, 2, 3, 4, 5], 3) => [[1, 2, 3], [4, 5]]
*/
function groups(items, size) {
    var groups = [];
    var index = 0;
    var offset = 0;
    var length = items.length;
    while (offset < length) {
        groups[index] = items.slice(offset, offset + size);
        index++;
        offset += size;
    }
    return groups;
}
exports.groups = groups;
//// }
