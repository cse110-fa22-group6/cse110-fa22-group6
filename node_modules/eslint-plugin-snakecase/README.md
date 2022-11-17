# eslint-plugin-snakecase

> Enforce snake_case on variables and function names

## Why

I work in a [Ruby house](https://www.tanda.co) so a lot of the JavaScript that we have has snake_case variable names as a holdover from Ruby.

This is to enforce a style, rather than just disabling [`camelcase`](http://eslint.org/docs/rules/camelcase).  I'm not a massive fan of this style,
but I am a massive fan of consistency.

## Usage

```
yarn add -D eslint-plugin-snakecase
```

```json
// .eslintrc
{
  // ...
  "plugins": [
    "snakecase"
  ],
  "rules": {
    "snakecase/snakecase": "error"
  }
}
```