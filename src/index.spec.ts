import test = require('blue-tape')
import { wrap, Strands, strand } from './index'

test('template', t => {
  t.test('wrap', t => {
    const template = wrap(function (t: Strands, data: any) {
      t.line('### Authors')
      t.line()

      data.authors.forEach(function (author: any) {
        t.line('* ', author.name)
      })
    })

    t.equal(template({ authors: [{ name: 'Blake' }, { name: 'John' }] }), '### Authors\n\n* Blake\n* John\n')
    t.end()
  })

  t.test('strand', t => {
    const query = strand(' ', '', ';')
    const tableName = 'test'

    query('SELECT *')
    query('FROM', tableName)
    query('WHERE count > 10')

    t.equal(query.toString(), 'SELECT * FROM test WHERE count > 10;')
    t.end()
  })

  t.test('template', t => {
    const html = new Strands()
    const head = new Strands({ indent: '  ' })
    const body = new Strands({ indent: '  ' })

    head.line('<meta charset="utf8">')

    body.line('<h1></h1>')
    body.return()
    body.line('<div></div>')

    html.multiline(`
<!doctype html>
<html>
<head>
`.trim())
    html.append(head)
    html.line('</head>')
    html.line('<body>')
    html.append(body)
    html.line('</body>')
    html.line('</html>')

    t.equal(
      html.toString(),
      '<!doctype html>\n<html>\n<head>\n  <meta charset="utf8">\n</head>\n<body>\n  <h1></h1>\n\n  <div></div>\n</body>\n</html>\n'
    )
    t.end()
  })
})
