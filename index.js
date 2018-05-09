const lodash = require('lodash');
const underscore = require('underscore');

const smallTestArray = [
  "foo",
  "bar",
  1,
  2,
  3,
  4,
  5,
  "foo",
  5,
  3,
  2,
  1,
  "bar",
  "baz",
  "The quick brown fox",
  543543,
  5434,
  432154,
  3454,
  2,
  3,
  { a: 1},
  [ 1, 2, 4 ],
  9,
  12,
  12,
  5,
  3,
  2,
  1,
  "bar",
  "baz",
  "The quick brown fox",
  543543,
  5434,
  "bar",
  1,
  2,
  3,
  4,
  5,
  "foo",
  "a",
  "b",
  "c",
  { a: 1},
  [ 1, 2, 4 ],
  "fun",
  12
];

const mediumTestArray = Array.from({length: 100}, () => smallTestArray).reduce((a, c) => [...a, ...c], []);

const largeTestArray = Array.from({length: 1000}, () => smallTestArray).reduce((a, c) => [...a, ...c], []);

let target;

const testMe = (testFn, name, arr) => {

  const limit = 10000;
  const start = new Date();

  for (let x = 0; x < limit; x++) {
    target = testFn(arr);
  }
  const end = new Date();

  console.log(`${name}:`);
  console.log(`Time elapsed: ${end - start}ms`);
  console.log(`Items/ms: ${(limit * arr.length)/(end - start)}`);
  console.log();
};

const lodashUniqTest = arr => lodash.uniq(arr);
const underscoreUniqTest = arr => underscore.uniq(arr);

const setTest = arr => Array.from(new Set(arr));

const objAssignTest = arr => Object.keys(arr.reduce((acc, curr) => Object.assign(acc, {[curr]: undefined}), {}));

const objAssignImmutableTest = arr => Object.keys(arr.reduce((acc, curr) => Object.assign({}, acc, {[curr]: undefined}), {}));

const objReduceTest = arr => Object.keys(arr.reduce((acc, curr) => {acc[curr] = undefined; return acc;}, {}));

const objForEachTest = arr => {
  const obj = {};
  arr.forEach(e => obj[e] = undefined);
  return Object.keys(obj);
};

console.log("Small")
testMe(lodashUniqTest, "lodash.uniq", smallTestArray);
testMe(underscoreUniqTest, "underscore.uniq", smallTestArray);
testMe(setTest, "ES6 Set", smallTestArray);
// testMe(objAssignTest, "Object assign", smallTestArray);
// testMe(objAssignImmutableTest, "Object assign immutable", smallTestArray);
testMe(objReduceTest, "Object reduce", smallTestArray);
testMe(objForEachTest, "Object for each", smallTestArray);

console.log("Medium")
testMe(lodashUniqTest, "lodash.uniq", mediumTestArray);
testMe(underscoreUniqTest, "underscore.uniq", mediumTestArray);
testMe(setTest, "Set", mediumTestArray);
// testMe(objAssignTest, "Object assign", mediumTestArray);
// testMe(objAssignImmutableTest, "Object assign immutable", mediumTestArray);
testMe(objReduceTest, "Object reduce", mediumTestArray);
testMe(objForEachTest, "Object for each", mediumTestArray);

// console.log("Large")
// testMe(uniqTest, "Uniq", largeTestArray);
// testMe(setTest, "Set", largeTestArray);
// // testMe(objTest, "Obj", largeTestArray);