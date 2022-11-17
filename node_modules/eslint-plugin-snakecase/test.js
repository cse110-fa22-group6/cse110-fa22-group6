var RuleTester = require('eslint').RuleTester;
var rule = require('./').rules.snakecase;

var ruleTester = new RuleTester();
ruleTester.run("snake_case", rule, {
  valid: [
    'var snake_case = true;',
    'function another_snake_case(){}',
    'function SomeClass() {}',
    'new SomeClass()',
    'SomeClass.method()',
  ],
  invalid: [{
    code: 'var notSnakeCase',
    errors: [{ message: 'Identifiers must be snake case: notSnakeCase', fix: { text: 'not_snake_case' } }],

  }]
})