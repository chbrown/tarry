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
export function pushAll<T>(array: T[], items: T[]): void {
  return Array.prototype.push.apply(array, items);
}

/**
Concatenate each array in `arrays`, returning a single array.

Uses `Array#concat` with Function.apply to unpack the given array into a bunch
of arrays, combining them all into a newly created array. Not recursive.
*/
export function flatten<T>(arrays: T[][]): T[] {
  // TODO: disallow mixing of arrays and non-arrays? (concat don't care)
  return Array.prototype.concat.apply([], arrays);
}

/**
Transpose an Array of Arrays.

E.g.:

    zip([
      [1, 2, 3],
      [2, 4, 6],
      [1, 4, 8],
      [10, 100, 1000],
    ])
    -> [[1, 2, 1, 10], [2, 4, 4, 100], [3, 6, 8, 1000]]

*/
export function zip<T>(itemss: T[][]) {
  var lengths = itemss.map(items => items.length);
  var minLength = Math.min(...lengths);
  return range(minLength).map(index => {
    return itemss.map(items => items[index]);
  });
}

/**
Call `fn` with each item in `items`, and flatten the results into a single array.

`fn` should always return an Array.

Uses `Array#map` and `Array#concat`.
*/
export function flatMap<T, R>(items: T[], fn: (item: T, index: number, array: T[]) => R[], thisArg?: any): R[] {
  var arrays: R[][] = items.map(fn, thisArg);
  return Array.prototype.concat.apply([], arrays);
}

/**
Ensure that the given value is an array.
If it is, return it.
If it's not an array, return it as the sole member of a new array.
If it's undefined, return an empty array.
*/
export function asArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (value !== undefined) {
    return [<T>value];
  }
  return [];
}

/**
Take anything that can be indexed by number (`iterable`) and return a new Array
of elements of that type.

Useful for things such as NodeList objects returned from DOM calls like
`document.querySelectorAll(...)`.

Uses a `for(;;)` loop.
*/
export function toArray<T>(iterable: {[index: number]: T, length: number}) {
  var length = iterable.length;
  var array: T[] = new Array(length);
  for (var i = 0; i < length; i++) {
    array[i] = iterable[i];
  }
  return array;
}

/**
Sum all items in `xs`

Equivalent to `return xs.reduce((a, b) => a + b, 0)`
*/
export function sum(xs: number[]): number {
  var total = 0;
  for (var i = 0, l = xs.length; i < l; i++) {
    total += xs[i];
  }
  return total;
}

/**
Return the mean of an array of numbers by calling `sum(xs)` and dividing by the
length. No special accomodation is made for non-numeric items in `xs`.

Returns `NaN` if `xs` is empty.

Uses `arrays.sum`.
*/
export function mean(xs: number[]): number {
  return sum(xs) / xs.length;
}

/**
Find the median of all items in `xs`, taking the mean of the central two values
if `xs` has an even number of items.

Returns `undefined` if `xs` is empty.

Does not manipulate `xs`.

Uses `Array#slice(0)` and `Array#sort`.
*/
export function median(xs: number[]): number {
  // sort without a predicate does lexicographic sort
  xs = xs.slice(0).sort((a, b) => a - b);
  // if xs is even, average the two middle items
  if (xs.length % 2 === 0) {
    var middle = xs.length / 2;
    return (xs[middle - 1] + xs[middle]) / 2.0;
  }
  return xs[(xs.length - 1) / 2];
}

/**
Returns an array of numbers that is (q + 1)-long (it includes the endpoints),
representing the entries at each of the requested quantiles.
*/
export function quantile(xs: number[], q: number, sort: boolean = true): number[] {
  const length = xs.length;
  const step = length / q;
  var quantile: number[] = [];
  if (sort) {
    xs = xs.slice(0).sort((a, b) => a - b);
  }
  for (var sample = 0; sample < length; sample += step) {
    quantile.push(xs[sample | 0]);
  }
  quantile.push(xs[length - 1]);
  return quantile;
}

/**
Find the minimum value in `xs`.

Returns `Infinity` if `xs` is empty.

Uses `Math.min`.
*/
export function min(xs: number[]): number {
  return Math.min.apply(null, xs);
}

/**
Find the maximum value in `xs`.

Returns `-Infinity` if `xs` is empty.

Uses `Math.max`.
*/
export function max(xs: number[]): number {
  return Math.max.apply(null, xs);
}

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
export function range(max: number, step: number = 1): number[] {
  const length = Math.ceil(max / step);
  var indices = new Array<number>(length);
  for (var i = 0; i < length; i++) {
    indices[i] = i * step;
  }
  return indices;
}

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
export function groups<T>(items: T[], size: number): T[][] {
  var groups: T[][] = [];
  var index = 0;
  var offset = 0;
  const length = items.length;
  while (offset < length) {
    groups[index] = items.slice(offset, offset + size);
    index++;
    offset += size;
  }
  return groups;
}

export function assign<T, U>(target: T, source: U): T & U;
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
/**
Copy each source's own enumerable properties into the target object.

@param {Object} target - The target object to copy into.
@param {Object[]} sources - One or more source objects from which to copy enumerable properties.
@returns {Object} - Returns the target object.
*/
export function assign(target: any, ...sources: any[]): any {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  target = Object(target);
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      target[key] = source[key];
    });
  });
  return target;
}

/**
Merge each subset of items that share the same identifier.

mergeBy([
  {id: 1, firstname: 'Chris'},
  {id: 1, lastname: 'Brown'},
  {id: 2, firstname: 'Lionel'},
]) => [
  {id: 1, firstname: 'Chris', lastname: 'Brown'},
  {id: 2, firstname: 'Lionel'},
]
*/
export function mergeBy<T>(items: T[], idKey: string = 'id'): T[] {
  let mergedItems: T[] = [];
  // mergedItemsMapping is a helper that maps from ids to the matching object,
  // which is also stored in the mergedItems array
  let mergedItemsMapping = {};
  items.forEach(item => {
    let id = item[idKey];
    let mergedItem = mergedItemsMapping[id];
    if (mergedItem === undefined) {
      mergedItem = mergedItemsMapping[id] = {};
      mergedItems.push(mergedItem);
    }
    assign(mergedItem, item);
  });
  return mergedItems;
}

/**
Concatenate each subset of items that share the same identifier.

groupBy([
  {id: 1, key: 'firstname', value: 'Chris'},
  {id: 1, key: 'lastname',  value: 'Brown'},
  {id: 2, key: 'firstname', value: 'Lionel'},
]) => [
  [
    {id: 1, key: 'firstname', value: 'Chris'},
    {id: 1, key: 'lastname',  value: 'Brown'},
  ],
  [
    {id: 2, key: 'firstname', value: 'Lionel'},
  ]
]

This is very similar to mergeBy, except that instead of using {} as a base
and combining with assign(), groupBy uses [] as a base and combines with push().
*/
export function groupBy<T>(items: T[], idKey: string = 'id'): T[][] {
  let groupedItems: T[][] = [];
  let groupedItemsMapping: {[index: string]: T[]} = {};
  items.forEach(item => {
    let id = item[idKey];
    let groupedItem = groupedItemsMapping[id];
    if (groupedItem === undefined) {
      groupedItem = groupedItemsMapping[id] = [];
      groupedItems.push(groupedItem);
    }
    groupedItem.push(item);
  });
  return groupedItems;
}

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
export function toObject<T>(items: T[], nameKey: string = 'key', valueKey: string = 'value') {
  let object = {};
  items.forEach(item => {
    object[item[nameKey]] = item[valueKey];
  });
  return object;
}

/**
Groups contiguous equivalent items together.

I.e., if equal(items[i], items[i + 1]) returns true, then items[i] and
items[i + 1] will end up in the same sublist.

Returns a regrouping of items that, if flattened, would be equivalent to items.
*/
export function groupSequential<T>(items: T[], areEqual: (a: T, b: T) => boolean = (a, b) => a === b): T[][] {
  if (items.length === 0) {
    return [];
  }
  let previousItem = items[0];
  let currentSublist = [previousItem];
  const sublists = [currentSublist];
  for (var i = 1, l = items.length; i < l; i++) {
    var currentItem = items[i];
    // if comparison returns true, currentItem belongs in the same group as previousItem
    if (areEqual(previousItem, currentItem)) {
      currentSublist.push(currentItem);
    }
    else {
      // start a new sublist and add it to sublists
      currentSublist = [currentItem];
      sublists.push(currentSublist);
    }
    previousItem = currentItem;
  }
  return sublists;
}
