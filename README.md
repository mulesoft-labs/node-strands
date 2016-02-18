# Strands

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Simple, light-weight string building for JavaScript.

## Installation

```
npm install strands --save
```

## Usage

### String Building

For simple string building.

**strand (separator = '', prefix = '', suffix = '')**

```js
import { strand } from 'strands'

const query = strand(' ', '', ';')

query('SELECT *')
query('FROM', tableName)
query('WHERE count > 10')

console.log(query) //=> "SELECT * FROM test WHERE count > 10;"
```

### Template Building

The template class built on top of a `strand`.

**new Strands ({ indent = '', eol = '\n' })**

```js
import { Strands } from 'strands'

const html = new Strands()
const head = new Strands({ indent: '  ' })
const body = new Strands({ indent: '  ' })

head.line('<meta charset="utf8">')

body.line('<h1></h1>')
body.return()
body.line('<div></div>')

html.line('<!doctype html>')
html.line('<html>')
html.line('<head>')
html.append(head)
html.line('</head>')
html.line('<body>')
html.append(body)
html.line('</body>')
html.line('</html>')

console.log(html.toString())
//=> "<!doctype html>\n<html>\n<head>\n  <meta charset="utf8">\n</head>\n<body>\n  <h1></h1>\n\n  <div></div>\n</body>\n</html>\n"
```

### Template Wrapper

Simple wrapper function for creating a "template-like function".

**wrap <T> (fn: (t: Strands, data: T) => any, options?: Options): (data: T) => string**

```js
import { wrap } from 'strands'

const doc = wrap(function (t, data) {
  t.line('### Authors')
  t.line()

  data.authors.forEach(function (author) {
    t.line('* ', author.name)
  })
})

console.log(doc({ authors: [{ name: 'Blake' }, { name: 'John' }] }))
//=> "### Authors\n\n* Blake\n* John\n"
```

## Useful Libraries

* [string-template](https://www.npmjs.com/package/string-template) - For simple placeholder replacement
* [moment](https://www.npmjs.com/package/moment) - For date formatting
* [chalk](https://www.npmjs.com/package/chalk) - For terminal color

## License

Apache License 2.0

[npm-image]: https://img.shields.io/npm/v/strands.svg?style=flat
[npm-url]: https://npmjs.org/package/strands
[downloads-image]: https://img.shields.io/npm/dm/strands.svg?style=flat
[downloads-url]: https://npmjs.org/package/strands
[travis-image]: https://img.shields.io/travis/mulesoft-labs/node-strands.svg?style=flat
[travis-url]: https://travis-ci.org/mulesoft-labs/node-strands
[coveralls-image]: https://img.shields.io/coveralls/mulesoft-labs/node-strands.svg?style=flat
[coveralls-url]: https://coveralls.io/r/mulesoft-labs/node-strands?branch=master
