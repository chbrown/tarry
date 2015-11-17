/**
Push each item in `items` onto the end of `array`.

Uses `Array#push`.
*/
export declare function pushAll<T>(array: T[], items: T[]): void;
/**
Concatenate each array in `arrays`, returning a single array.

Uses `Array#concat`.
*/
export declare function flatten<T>(arrays: T[][]): T[];
/**
Call `fn` with each item in `items`, and flatten the results into a single array.

`fn` should always return an Array.

Uses `Array#map` and `Array#concat`.
*/
export declare function flatMap<T, R>(items: T[], fn: (item: T, index: number, array: T[]) => R[], thisArg?: any): R[];
/**
Ensure that the given value is an array.
If it is, return it.
If it's not an array, return it as the sole member of a new array.
If it's undefined, return an empty array.
*/
export declare function asArray<T>(value: T | T[]): T[];
/**
Take anything that can be indexed by number (`iterable`) and return a new Array
of elements of that type.

Useful for things such as NodeList objects returned from DOM calls like
`document.querySelectorAll(...)`.

Uses a `for(;;)` loop.
*/
export declare function toArray<T>(iterable: {
    [index: number]: T;
    length: number;
}): T[];
/**
Sum all items in `xs`

Equivalent to `return xs.reduce((a, b) => a + b, 0)`
*/
export declare function sum(xs: number[]): number;
/**
Return the mean of an array of numbers by calling `sum(xs)` and dividing by the
length. No special accomodation is made for non-numeric items in `xs`.

Returns `NaN` if `xs` is empty.

Uses `arrays.sum`.
*/
export declare function mean(xs: number[]): number;
/**
Find the median of all items in `xs`, taking the mean of the central two values
if `xs` has an even number of items.

Returns `undefined` if `xs` is empty.

Does not manipulate `xs`.

Uses `Array#slice(0)` and `Array#sort`.
*/
export declare function median(xs: number[]): number;
/**
Returns an array of numbers that is (q + 1)-long (it includes the endpoints),
representing the entries at each of the requested quantiles.
*/
export declare function quantile(xs: number[], q: number, sort?: boolean): number[];
/**
Find the minimum value in `xs`.

Returns `Infinity` if `xs` is empty.

Uses `Math.min`.
*/
export declare function min(xs: number[]): number;
/**
Find the maximum value in `xs`.

Returns `-Infinity` if `xs` is empty.

Uses `Math.max`.
*/
export declare function max(xs: number[]): number;
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
export declare function range(max: number, step?: number): number[];
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
export declare function groups<T>(items: T[], size: number): T[][];
