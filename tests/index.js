import assert from 'assert';
import {describe, it} from 'mocha';

import * as tarry from '..';

describe('pushAll', () => {
  it('should push all entries in the second argument onto the first argument', () => {
    let array = [1, 10, 100];
    const expected = [1, 10, 100, 1000, 10000];
    tarry.pushAll(array, [1000, 10000]);
    assert.deepEqual(array, expected);
  });
});

describe('flatten', () => {
  it('should flatten a list of lists into a single list', () => {
    assert.deepEqual(tarry.flatten([[1], [10, 100], [1000, 10000]]), [1, 10, 100, 1000, 10000]);
  });
});

describe('flatMap', () => {
  it('should map a list into another list using a function from values to lists', () => {
    let actual = tarry.flatMap([1, 2, 3, 4, 5], x => {
      // this predicate filters out numbers less than or equal to 2
      // and multiplies all other values by 10
      if (x > 2) {
        return [x * 10];
      }
      else {
        return [];
      }
    });
    assert.deepEqual(actual, [30, 40, 50]);
  });
});

describe('asArray', () => {
  it('should not wrap an Array in another Array', () => {
    assert.deepEqual(tarry.asArray([900]), [900]);
  });
  it('should wrap a scalar in an Array', () => {
    assert.deepEqual(tarry.asArray(900), [900]);
  });
  it('should wrap undefined as an empty Array', () => {
    assert.deepEqual(tarry.asArray(), []);
  });
});


describe('sum', () => {
  it('should sum [1, 2, 3, 4] to 10', () => {
    assert.equal(tarry.sum([1, 2, 3, 4]), 10);
  });
});

describe('mean', () => {
  it('should average [1, 2, 3, 4, 5] to 3', () => {
    assert.equal(tarry.mean([1, 2, 3, 4, 5]), 3);
  });
});

describe('median', () => {
  it('should median [64, 1, 5, 2, 19] to 5', () => {
    assert.equal(tarry.median([64, 1, 5, 2, 19]), 5);
  });
  it('should median [64, 1, 5, 7, 2, 19] to 6', () => {
    assert.equal(tarry.median([64, 1, 5, 7, 2, 19]), 6);
  });
});

describe('min', () => {
  it('should min [64, 1, 5, 2, 19] to 1', () => {
    assert.equal(tarry.min([64, 1, 5, 2, 19]), 1);
  });
});

describe('max', () => {
  it('should max [64, 1, 5, 2, 19] to 64', () => {
    assert.equal(tarry.max([64, 1, 5, 2, 19]), 64);
  });
});

describe('range', () => {
  it('should generate range(5) as [0, 1, 2, 3, 4]', () => {
    assert.deepEqual(tarry.range(5), [0, 1, 2, 3, 4]);
  });
  it('should generate range(0) as []', () => {
    assert.deepEqual(tarry.range(0), []);
  });
  it('should generate range(10, 5) as [0, 5]', () => {
    assert.deepEqual(tarry.range(10, 5), [0, 5]);
  });
  it('should generate range(11, 5) as [0, 5, 10]', () => {
    assert.deepEqual(tarry.range(11, 5), [0, 5, 10]);
  });
});

describe('groups', () => {
  it('should group [1, 2, 3, 4, 5], 1 as [[1], [2], [3], [4], [5]]', () => {
    assert.deepEqual(tarry.groups([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]]);
  });
  it('should group [1, 2, 3, 4, 5], 2 as [[1, 2], [3, 4], [5]]', () => {
    assert.deepEqual(tarry.groups([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  });
  it('should group [1, 2, 3, 4, 5], 3 as [[1, 2, 3], [4, 5]]', () => {
    assert.deepEqual(tarry.groups([1, 2, 3, 4, 5], 3), [[1, 2, 3], [4, 5]]);
  });
});

describe('assign', () => {
  it('should merge two non-overlapping objects', () => {
    assert.deepEqual(tarry.assign({a: 97}, {b: 98}), {a: 97, b: 98});
  });
  it('should throw with null target object', () => {
    assert.throws(() => tarry.assign(null, {b: 98}));
  });
});
