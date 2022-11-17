# Use Jest for writing test cases

## Context and Problem Statement

We need to decide which tester will be implemented for in the pipeline
This will also decide how tests will be written for our JS

## Considered Options

* Jest
* Mocha

## Decision Outcome

Chosen option: "Jest".

## Consequences

* Seems straightforward
* Easy to Install and Work with
* Not as many features as Mocha

## Pros and Cons of the Options

## Jest

Jest Getting Started Guide: <https://jestjs.io/docs/getting-started>

```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
* Good, Seems simple and straightforward
* Good, Uses expect() followed by a matcher so like a toBe() function
* Good, Easy to install in the pipeline, github action
* Good, Create files using fileNameToTest.test.js
* Bad, Not as many features as Mocha

## Mocha

Mocha Getting Started Guide: <https://mochajs.org/#getting-started>

```
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

* Good, a lot of different tests available
* Good, can test asynchronous code
* Good, can also display test duration
* Bad, Seems a bit more complicated
* Bad, Not as easy to install, not on the github marketplace

