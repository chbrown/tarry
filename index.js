/**
Push each item in `items` onto the end of `array`.

@param {Array} array: the array to extend with new items
@param {Array} items: array of new items

Similar to:

    target = target.concat(items);

Calls Array#push with Function.apply to unpack a single input array into
multiple arguments.

Equivalent to `array.push(...items)`
*/
function pushAll(array, items) {
    return Array.prototype.push.apply(array, items);
}
exports.pushAll = pushAll;
/**
Concatenate each array in `arrays`, returning a single array.

Uses `Array#concat` with Function.apply to unpack the given array into a bunch
of arrays, combining them all into a newly created array. Not recursive.
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
Ensure that the given value is an array.
If it is, return it.
If it's not an array, return it as the sole member of a new array.
If it's undefined, return an empty array.
*/
function asArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (value !== undefined) {
        return [value];
    }
    return [];
}
exports.asArray = asArray;
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
    // sort without a predicate does lexicographic sort
    xs = xs.slice(0).sort(function (a, b) { return a - b; });
    // if xs is even, average the two middle items
    if (xs.length % 2 === 0) {
        var middle = xs.length / 2;
        return (xs[middle - 1] + xs[middle]) / 2.0;
    }
    return xs[(xs.length - 1) / 2];
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
/**
Copy each source's own enumerable properties into the target object.

@param {Object} target - The target object to copy into.
@param {Object[]} sources - One or more source objects from which to copy enumerable properties.
@returns {Object} - Returns the target object.
*/
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
exports.assign = assign;
/**
Merge each item in items that shares the same identifier.

mergeBy([
  {id: 1, firstname: 'Chris'},
  {id: 1, lastname: 'Brown'},
  {id: 2, firstname: 'Lionel'},
]) => [
  {id: 1, firstname: 'Chris', lastname: 'Brown'},
  {id: 2, firstname: 'Lionel'},
]
*/
function mergeBy(items, idKey) {
    if (idKey === void 0) { idKey = 'id'; }
    var mergedItems = [];
    // mergedItemsMapping is a helper that maps from ids to the matching object,
    // which is also stored in the mergedItems array
    var mergedItemsMapping = {};
    items.forEach(function (item) {
        var id = item[idKey];
        var mergedItem = mergedItemsMapping[id];
        if (mergedItem === undefined) {
            mergedItem = mergedItemsMapping[id] = {};
            mergedItems.push(mergedItem);
        }
        assign(mergedItem, item);
    });
    return mergedItems;
}
exports.mergeBy = mergeBy;
/**
Convert an Array of objects with fixed keys to an object with variable keys.

E.g.:

    toObject([
      {key: 'firstname', value: 'Chris'},
      {key: 'lastname', value: 'Brown'},
    ]) => [
      {firstname: 'Chris', lastname: 'Brown'},
    ]
*/
function toObject(items, nameKey, valueKey) {
    if (nameKey === void 0) { nameKey = 'key'; }
    if (valueKey === void 0) { valueKey = 'value'; }
    var object = {};
    items.forEach(function (item) {
        object[item[nameKey]] = item[valueKey];
    });
    return object;
}
exports.toObject = toObject;
